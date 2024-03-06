import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseCreateDTO } from './dto/course_create.dto';
import { CourseUpdateDTO } from './dto/course_update.dto';
import { Course } from './course.model';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Get()
    async getAllCourses() {
        return await this.coursesService.getAllCourses();
    }

    @Get(':id')
    async getCourse(@Param('id') id: string) {
        const course = await this.coursesService.getCourse(id);

        if (!course)
            return { message: "El curso no existe" }
    }

    @Post()
    async createCourse(@Body() courseData: CourseCreateDTO) {
        return await this.coursesService.createCourse(courseData);
    }

    @Put(':id')
    async updateCourse(
        @Param('id') id: string,
        @Body() courseData: CourseUpdateDTO,
    ): Promise<Course | undefined> {
        return await this.coursesService.updateCourse(id, courseData);
    }

    @Delete(':id')
    async deleteCourse(@Param('id') id: string): Promise<Course | undefined> {
        return await this.coursesService.deleteCourse(id);
    }
}
