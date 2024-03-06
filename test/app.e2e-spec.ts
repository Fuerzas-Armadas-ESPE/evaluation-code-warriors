import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { beforeEach, describe, it } from 'node:test';
import { CourseSchema } from 'src/courses/course.model';
import { ClassSchema } from 'src/classes/class.model';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });

    it('/ (GET)', () => {
        request(app.getHttpServer())
            .get('/courses')
            .expect(200)
    });
});