import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseSchema } from './course.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }])],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [CoursesService, MongooseModule]
})
export class CoursesModule { }
