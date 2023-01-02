import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { globalFilters } from 'src/shared/constants';
import { DataSource } from 'typeorm';

describe('Movies', () => {
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

  describe('create a new movie', () => {
    it(`successfully created the new movie given valid payload`, async () => {
      const httpServer = app.getHttpServer();
      const postResponse = await request(httpServer)
        .post('/movies')
        .send({ name: 'Testing movies' });

      expect(postResponse.status).toEqual(HttpStatus.CREATED);

      const newlyCreatedMovie = postResponse.body;
      const getResponse = await request(httpServer)
        .get(`/movies/${newlyCreatedMovie.id}`)
        .send();

      expect(getResponse.status).toEqual(HttpStatus.OK);
    });

    it(`return 400 bad request given invalid payload`, async () => {
      const httpServer = app.getHttpServer();
      const response = await request(httpServer).post('/movies').send({});
      expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    });
  });

  describe('update a movie', () => {
    it(`successfully updated the movie given valid payload`, async () => {
      const httpServer = app.getHttpServer();
      const postResponse = await request(httpServer)
        .post('/movies')
        .send({ name: 'Testing movies' });

      const newlyCreatedMovie = postResponse.body;
      expect(postResponse.status).toEqual(HttpStatus.CREATED);
      expect(postResponse.body.id).not.toBeUndefined();

      const putResponse = await request(httpServer)
        .put(`/movies/${newlyCreatedMovie.id}`)
        .send({ name: 'Update testing movies' });

      expect(putResponse.status).toEqual(HttpStatus.OK);

      const getResponse = await request(httpServer)
        .get(`/movies/${newlyCreatedMovie.id}`)
        .send();

      expect(getResponse.status).toEqual(HttpStatus.OK);
      expect(getResponse.body.name).toEqual('Update testing movies');
    });

    it(`return 404 not found when movie cannot be found`, async () => {
      const httpServer = app.getHttpServer();
      const response = await request(httpServer)
        .put('/movies/1')
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
