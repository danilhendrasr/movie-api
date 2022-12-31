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
    updateMovie: jest.fn((id: number) => {
      if (id < 0) {
        throw new EntityNotFoundError(
          Movie,
          'Could not find entity of type matching blabla.',
        );
      }
    }),
    createNewMovie: jest.fn(),
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
      providers: [
        {
          provide: MoviesService,
          useValue: serviceMocks,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
    mockRes.clearMockRes();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all', () => {
    it('should call find all method of MoviesService', async () => {
      await controller.getMovies();
      expect(service.getAllMovies).toHaveBeenCalled();
    });
  });

  describe('get one', () => {
    it('should call find one movie from MovieService', async () => {
      const movieId = 1;
      await controller.getMovieCasts(movieId, getMockRes().res);
      expect(service.getCasts).toHaveBeenCalledWith(movieId);
    });

    it('should set status code to 404 if movie cannot be found', async () => {
      const movieId = -1;
      await controller.getMovieCasts(movieId, res);
      expect(service.getCasts).toHaveBeenCalledWith(movieId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('get casts of a movie', () => {
    it('should call ', () => {
      expect(controller.getMovieCasts(1, res)).resolves.toBe(castsArray);
    });

    it('should set status code to 404 if movie cannot be found', async () => {
      const movieId = -1;
      await controller.getMovieCasts(movieId, res);
      expect(service.getCasts).toHaveBeenCalledWith(movieId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('create movie', () => {
    it('should call create movie service with given payload', () => {
      controller.createMovie({ name: 'The Girl On The Train' });
      expect(service.createNewMovie).toBeCalledWith({
        name: 'The Girl On The Train',
      });
    });
  });

  describe('update a movie', () => {
    it('should call create movie service with given payload', async () => {
      const payload = { name: 'Batman: Vengeance' };
      await controller.updateMovie(1, payload, res);
      expect(service.updateMovie).toBeCalledWith(1, payload);
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
    it('should call delete a movie service with given payload', () => {
      const createMovieServiceSpy = jest.spyOn(service, 'deleteMovie');
      controller.deleteMovie(1, res);
      expect(createMovieServiceSpy).toBeCalledWith(1);
    });

    it('should set status code to 404 if movie cannot be found', async () => {
      const movieId = -1;
      await controller.deleteMovie(movieId, res);
      expect(service.deleteMovie).toHaveBeenCalledWith(movieId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });
});
