import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { ClassesModule } from './classes/classes.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://codewarriors:espe2024@localhost:27017', { dbName: 'course_manager' }),
        CoursesModule,
        ClassesModule,
        SubjectsModule
    ],
})
export class AppModule { }
