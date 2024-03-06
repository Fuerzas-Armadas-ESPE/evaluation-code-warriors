import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ClassSchema } from './class.model';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
    imports: [CoursesModule, MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }])],
    controllers: [ClassesController],
    providers: [ClassesService],
    exports: [ClassesService, MongooseModule]
})
export class ClassesModule { }
