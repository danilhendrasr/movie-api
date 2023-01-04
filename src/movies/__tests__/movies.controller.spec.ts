import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import {
  moviesArray,
  oneMovie,
  castsArray,
  mockRes,
} from 'src/shared/test/constants';
import { movieServiceMock } from 'src/shared/test/mocks';
import { EntityNotFoundError } from 'typeorm';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

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
      const result = await controller.getOneMovie(movieId);
      expect(service.getOneMovie).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(oneMovie);
    });

    it('should throw EntityNotFoundError if movie cannot be found', async () => {
      const movieId = -1;
      await expect(controller.getOneMovie(movieId)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(service.getOneMovie).toHaveBeenCalledWith(movieId);
    });
  });

  describe('get casts of a movie', () => {
    it('should return an array of casts', async () => {
      const movieId = 1;
      const result = await controller.getMovieCasts(movieId);
      expect(service.getCasts).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(castsArray);
    });

    it('should throw EntityNotFoundError if movie cannot be found', async () => {
      const movieId = -1;
      await expect(controller.getMovieCasts(movieId)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(service.getCasts).toHaveBeenCalledWith(movieId);
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
      const result = await controller.updateMovie(1, payload);
      expect(service.updateMovie).toBeCalledWith(1, payload);
      expect(result).toEqual({ ...oneMovie, ...payload });
    });

    it('should throw EntityNotFoundError if movie cannot be found', async () => {
      const movieId = -1;
      const payload = { name: 'Batman Vengeance' };
      await expect(controller.updateMovie(movieId, payload)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(service.updateMovie).toHaveBeenCalledWith(movieId, payload);
    });
  });

  describe('delete a movie', () => {
    it('should set status 204 and have no json response', async () => {
      const result = await controller.deleteMovie(1);
      expect(service.deleteMovie).toBeCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw EntityNotFoundError if movie cannot be found', async () => {
      const movieId = -1;
      await expect(controller.deleteMovie(movieId)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(service.deleteMovie).toHaveBeenCalledWith(movieId);
    });
  });
});
