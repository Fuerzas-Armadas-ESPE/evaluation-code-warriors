import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassCreateDTO } from './dto/class_create.dto';
import { ClassUpdateDTO } from './dto/class_update.dto';
import { Class } from './class.model';

@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) { }

    @Get()
    async getAllClasses() {
        return await this.classesService.getAllClasses();
    }

    @Get(':id')
    async getClass(@Param('id') id: string) {
        return await this.classesService.getClass(id);
    }

    @Get('/course/:idCourse')
    async getClassesOfCourse(@Param('idCourse') idCourse: string) {
        return await this.classesService.getClassesOfCourse(idCourse);
    }

    @Post(':idCourse')
    async createClass(@Param('idCourse') idCourse: string, @Body() classData: ClassCreateDTO) {
        return await this.classesService.createClass(idCourse, classData)
    }

    @Put(':id')
    async updateClass(
        @Param('id') id: string,
        @Body() classData: ClassUpdateDTO,
    ): Promise<Class | undefined> {
        return await this.classesService.updateClass(id, classData);
    }

    @Delete(':id')
    async deleteClass(@Param('id') id: string): Promise<Class | undefined> {
        return await this.classesService.deleteClass(id);
    }
}
