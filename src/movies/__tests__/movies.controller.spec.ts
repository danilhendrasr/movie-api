import { Test, TestingModule } from '@nestjs/testing';
import { Cast } from 'src/casts/casts.entity';
import { EntityNotFoundError } from 'typeorm';
import { MoviesController } from '../movies.controller';
import { Movie } from '../movies.entity';
import { MoviesService } from '../movies.service';
import { getMockRes } from '@jest-mock/express';
import { HttpStatus } from '@nestjs/common';

const moviesArray: Movie[] = [
  {
    id: 1,
    name: 'The Girl On The Train',
    rating: 3,
    language: 'english',
  },
];

const castsArray: Cast[] = [
  {
    id: 1,
    name: 'Danil Hendra',
  },
];

const oneMovie: Movie = {
  id: 1,
  name: 'The Girl On The Train',
  rating: 3,
  language: 'english',
};

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;
  const mockRes = getMockRes();
  const res = mockRes.res;

  const serviceMocks: Record<keyof MoviesService, any> = {
    getAllMovies: jest.fn().mockResolvedValue(moviesArray),
    getOneMovie: jest.fn((id: number) => {
      if (id < 0) {
        throw new EntityNotFoundError(
          Movie,
          'Could not find entity of type matching blabla.',
        );
      }

      return oneMovie;
    }),
    getCasts: jest.fn((id: number) => {
      if (id < 0) {
        throw new EntityNotFoundError(
          Movie,
          'Could not find entity of type matching blabla.',
        );
      }

      return castsArray;
    }),
    updateMovie: jest.fn((id: number, payload: Partial<Movie>) => {
      if (id < 0) {
        throw new EntityNotFoundError(
          Movie,
          'Could not find entity of type matching blabla.',
        );
      }

      return {
        ...oneMovie,
        ...payload,
      };
    }),
    createNewMovie: jest.fn((movie: Partial<Movie>) => {
      return {
        id: 1,
        ...movie,
      };
    }),
    deleteMovie: jest.fn((id: number) => {
      if (id < 0) {
        throw new EntityNotFoundError(
          Movie,
          'Could not find entity of type matching blabla.',
        );
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: serviceMocks }],
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
