import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
    let service: CoursesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoursesService,
                {
                    provide: getModelToken('Course'),
                    useValue: {
                        title: 'Clase de '
                    }, // Proporciona un valor falso para el modelo
                },
            ],
        }).compile();

        service = module.get<CoursesService>(CoursesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Agrega más pruebas según sea necesario para los métodos del servicio
});