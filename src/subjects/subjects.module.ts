import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { SubjectSchema } from './subject.model';
import { ClassesModule } from 'src/classes/classes.module';

@Module({
    imports: [ClassesModule, MongooseModule.forFeature([{ name: 'Subject', schema: SubjectSchema }])],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule { }
