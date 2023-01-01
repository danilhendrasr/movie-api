import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import { getMockRes } from '@jest-mock/express';
import { HttpStatus } from '@nestjs/common';
import {
  moviesArray,
  oneMovie,
  castsArray,
  mockRes,
} from 'src/shared/test/constants';
import { movieServiceMock } from 'src/shared/test/mocks';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;
  const res = mockRes.res;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: movieServiceMock }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
    mockRes.clearMockRes();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all', () => {
    it('should return an array of movies', async () => {
      const result = await controller.getMovies();
      expect(service.getAllMovies).toHaveBeenCalled();
      expect(result).toEqual(moviesArray);
    });
  });

  describe('get one', () => {
    it('should return a single movie', async () => {
      const movieId = 1;
      const result = await controller.getOneMovie(movieId, getMockRes().res);
      expect(service.getOneMovie).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(oneMovie);
    });

    it('should set status code to 404 if movie cannot be found', async () => {
      const movieId = -1;
      await controller.getOneMovie(movieId, res);
      expect(service.getOneMovie).toHaveBeenCalledWith(movieId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('get casts of a movie', () => {
    it('should return an array of casts', async () => {
      const movieId = 1;
      const result = await controller.getMovieCasts(movieId, res);
      expect(service.getCasts).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(castsArray);
    });

    it('should set status code to 404 if movie cannot be found', async () => {
      const movieId = -1;
      await controller.getMovieCasts(movieId, res);
      expect(service.getCasts).toHaveBeenCalledWith(movieId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('create movie', () => {
    it('should return the newly-created movie', async () => {
      const payload = { name: 'The Girl On The Train' };
      const result = await controller.createMovie(payload);
      expect(service.createNewMovie).toBeCalledWith(payload);
      expect(result).toEqual(
        expect.objectContaining({ id: expect.any(Number) }),
      );
    });
  });

  describe('update a movie', () => {
    it('should return the updated movie', async () => {
      const payload = { name: 'Batman: Vengeance' };
      const result = await controller.updateMovie(1, payload, res);
      expect(service.updateMovie).toBeCalledWith(1, payload);
      expect(result).toEqual({ ...oneMovie, ...payload });
    });

    it('should set status code to 404 if movie cannot be found', async () => {
      const movieId = -1;
      const payload = { name: 'Batman Vengeance' };
      await controller.updateMovie(movieId, payload, res);
      expect(service.updateMovie).toHaveBeenCalledWith(movieId, payload);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('delete a movie', () => {
    it('should set status 204 and have no json response', async () => {
      const result = await controller.deleteMovie(1, res);
      expect(service.deleteMovie).toBeCalledWith(1);
      expect(result).toBeUndefined();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
    });

    it('should set status code to 404 if movie cannot be found', async () => {
      const movieId = -1;
      await controller.deleteMovie(movieId, res);
      expect(service.deleteMovie).toHaveBeenCalledWith(movieId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });
});
