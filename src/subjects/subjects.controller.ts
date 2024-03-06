import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectCreateDTO } from './dto/subject_create.dto';
import { SubjectUpdateDTO } from './dto/subject_update.dto';
import { Subject } from './subject.model';

@Controller('subjects')
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) { }

    @Get()
    async getAllSubjects() {
        return await this.subjectsService.getAllSubjects();
    }

    @Get(':id')
    async getSubject(@Param('id') id: string) {
        return await this.subjectsService.getSubject(id);
    }

    @Get('/class/:idClass')
    async getSubjectsOfClass(@Param('idClass') idClass: string) {
        return await this.subjectsService.getSubjectsOfClass(idClass);
    }

    @Post(':idClass')
    async createSubject(@Param('idClass') idClass: string, @Body() subjectData: SubjectCreateDTO) {
        return await this.subjectsService.createSubject(idClass, subjectData)
    }

    @Put(':id')
    async updateSubject(
        @Param('id') id: string,
        @Body() subjectData: SubjectUpdateDTO,
    ): Promise<Subject | undefined> {
        return await this.subjectsService.updateSubject(id, subjectData);
    }

    @Delete(':id')
    async deleteSubject(@Param('id') id: string): Promise<Subject | undefined> {
        return await this.subjectsService.deleteSubject(id);
    }
}
