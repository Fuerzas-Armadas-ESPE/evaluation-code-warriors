import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './course.model';
import { CourseUpdateDTO } from './dto/course_update.dto';

@Injectable()
export class CoursesService {
    constructor(@InjectModel('Course') private readonly courseModel: Model<Course>) { }

    async getAllCourses(): Promise<Course[]> {
        return await this.courseModel.find().exec();
    }

    async getCourse(id: string): Promise<Course | undefined> {
        try {
            const course = await this.courseModel.findById(id).exec();
            console.log(course)
            if (!course)
                return undefined

            return course;
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async createCourse(courseData: any): Promise<Course> {
        try {
            const createdCourse = new this.courseModel(courseData);
            return await createdCourse.save();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateCourse(id: string, courseData: CourseUpdateDTO): Promise<Course | undefined> {
        try {
            const existingCourse = await this.courseModel.findById(id).exec();

            if (!existingCourse) {
                throw new NotFoundException(`El curso ${id} no existe, por lo que no pudo ser actualizado`);
            }

            existingCourse.title = courseData.title

            return await existingCourse.save();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteCourse(id: string): Promise<Course | undefined> {
        try {
            const courseDeleted = await this.courseModel.findByIdAndDelete(id).exec();

            if (!courseDeleted) {
                throw new NotFoundException(`El curso ${id} no existe, por lo que no pudo ser eliminado`);
            }

            return courseDeleted

        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async changeCourseState(id: string, newState: boolean): Promise<void> {
        try {
            let courseMatch = await this.courseModel.findById(id).exec();

            if (!courseMatch)
                throw new NotFoundException(`El curso ${id} no existe, por lo que no pudo ser actualizado`);

            courseMatch.isComplete = newState
            await courseMatch.save();
        } catch (error: any) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
