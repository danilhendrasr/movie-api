import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { globalFilters } from 'src/shared/constants';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('Casts', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    dataSource = app.get<DataSource>(DataSource);
    app.useGlobalFilters(...globalFilters);
    await app.init();
  });

  describe('create a new cast', () => {
    it(`successfully created the new cast given valid payload`, async () => {
      const httpServer = app.getHttpServer();
      const postResponse = await request(httpServer)
        .post('/casts')
        .send({ name: faker.name.fullName() });

      expect(postResponse.status).toEqual(HttpStatus.CREATED);

      const newlyCreatedCast = postResponse.body;
      const getResponse = await request(httpServer)
        .get(`/casts/${newlyCreatedCast.id}`)
        .send();

      expect(getResponse.status).toEqual(HttpStatus.OK);
    });

    it(`return 400 bad request given invalid payload`, async () => {
      const httpServer = app.getHttpServer();
      const response = await request(httpServer).post('/casts').send({});
      expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    });
  });

  describe('update a cast', () => {
    it(`successfully updated the cast given valid payload`, async () => {
      const httpServer = app.getHttpServer();
      const postResponse = await request(httpServer)
        .post('/casts')
        .send({ name: faker.name.fullName() });

      const newlyCreatedCast = postResponse.body;
      expect(postResponse.status).toEqual(HttpStatus.CREATED);
      expect(postResponse.body.id).not.toBeUndefined();

      const putResponse = await request(httpServer)
        .put(`/casts/${newlyCreatedCast.id}`)
        .send({ name: 'Iko Uwais' });

      expect(putResponse.status).toEqual(HttpStatus.OK);

      const getResponse = await request(httpServer)
        .get(`/casts/${newlyCreatedCast.id}`)
        .send();

      expect(getResponse.status).toEqual(HttpStatus.OK);
      expect(getResponse.body.name).toEqual('Iko Uwais');
    });

    it(`return 404 not found when cast cannot be found`, async () => {
      const httpServer = app.getHttpServer();
      const response = await request(httpServer)
        .put('/casts/1')
        .send({ name: 'Updating' });
      expect(response.status).toEqual(HttpStatus.NOT_FOUND);
    });
  });

  afterEach(async () => {
    await dataSource.dropDatabase();
  });

  afterAll(async () => {
    await app.close();
  });
});
