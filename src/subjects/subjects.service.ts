import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './subject.model';
import { SubjectUpdateDTO } from './dto/subject_update.dto';
import { ClassesService } from 'src/classes/classes.service';
import { SubjectCreateDTO } from './dto/subject_create.dto';

@Injectable()
export class SubjectsService {
    constructor(@InjectModel('Subject') private readonly subjectModel: Model<Subject>, @Inject(ClassesService) private readonly classesService: ClassesService) {
    }

    async getAllSubjects(): Promise<Subject[]> {
        return await this.subjectModel.find().exec();
    }

    async getSubjectsOfClass(idClassFilter: string) {
        try {
            return this.subjectModel.find({ idClass: idClassFilter })
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getSubject(id: string): Promise<Subject | undefined> {
        try {
            const subjectFound = await this.subjectModel.findById(id).exec();

            if (!subjectFound) {
                throw new NotFoundException(`El tema ${id} no existe`);
            }

            return subjectFound;
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async createSubject(idClass: string, subjectData: SubjectCreateDTO) {
        try {
            const classExist = await this.classesService.getClass(idClass)

            if (!classExist)
                throw new NotFoundException('La clase al que quiere asignar el tema no existe')

            const createdSubject = new this.subjectModel({ idClass, title: subjectData.title });
            return await createdSubject.save();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateSubject(id: string, subjectData: SubjectUpdateDTO): Promise<Subject | undefined> {
        try {
            const existingSubject = await this.subjectModel.findById(id).exec();

            if (!existingSubject) {
                throw new NotFoundException(`El tema ${id} no existe, por lo que no pudo ser actualizado`);
            }

            if (subjectData.title !== undefined)
                existingSubject.title = subjectData.title

            if (subjectData.isComplete !== undefined)
                existingSubject.isComplete = subjectData.isComplete

            const updateSubject = await existingSubject.save()
            const idClass = String(updateSubject.idClass)
            const subjects = await this.getSubjectsOfClass(idClass)

            const classComplete = subjects.every(subject => subject.isComplete)
            
            await this.classesService.changeClassState(idClass, classComplete)
            return updateSubject;
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteSubject(id: string): Promise<Subject | undefined> {
        try {
            const subjectDeleted = await this.subjectModel.findByIdAndDelete(id).exec();

            if (!subjectDeleted) {
                throw new NotFoundException(`El tema ${id} no existe, por lo que no pudo ser eliminado`);
            }

            return subjectDeleted

        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
