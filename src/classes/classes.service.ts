import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './class.model';
import { ClassUpdateDTO } from './dto/class_update.dto';
import { CoursesService } from 'src/courses/courses.service';
import { ClassCreateDTO } from './dto/class_create.dto';

@Injectable()
export class ClassesService {
    constructor(@InjectModel('Class') private readonly classModel: Model<Class>, @Inject(CoursesService) private readonly coursesService: CoursesService) {
    }

    async getAllClasses(): Promise<Class[]> {
        return await this.classModel.find().exec();
    }

    async getClassesOfCourse(idCourseFilter: string) {
        try {
            return this.classModel.find({ idCourse: idCourseFilter })
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getClass(id: string): Promise<Class | undefined> {
        try {
            const classFound = await this.classModel.findById(id).exec();

            if (!classFound) {
                throw new NotFoundException(`La clase ${id} no existe`);
            }

            return classFound;
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async createClass(idCourse: string, classData: ClassCreateDTO) {
        try {
            const courseExist = await this.coursesService.getCourse(idCourse)

            if (!courseExist)
                throw new NotFoundException('El curso al que quiere asignar la clase no existe')

            const createdClass = new this.classModel({ idCourse, title: classData.title });
            return await createdClass.save();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateClass(id: string, classData: ClassUpdateDTO): Promise<Class | undefined> {
        try {
            const existingClass = await this.classModel.findById(id).exec();

            if (!existingClass) {
                throw new NotFoundException(`La clase ${id} no existe, por lo que no pudo ser actualizado`);
            }

            if (classData.title !== undefined)
                existingClass.title = classData.title

            return await existingClass.save();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteClass(id: string): Promise<Class | undefined> {
        try {
            const classDeleted = await this.classModel.findByIdAndDelete(id).exec();

            if (!classDeleted) {
                throw new NotFoundException(`La clase ${id} no existe, por lo que no pudo ser eliminado`);
            }

            return classDeleted

        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async changeClassState(id: string, newState: boolean): Promise<void> {
        try {
            let classMatch = await this.classModel.findById(id).exec();

            if (!classMatch)
                throw new NotFoundException(`La clase ${id} no existe, por lo que no pudo ser actualizado`);

            classMatch.isComplete = newState
            const updateClass = await classMatch.save();
            const idCourse = String(updateClass.idCourse)
            const classes = await this.getClassesOfCourse(idCourse)

            const courseComplete = classes.every(classDb => classDb.isComplete)

            await this.coursesService.changeCourseState(idCourse, courseComplete)

        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
