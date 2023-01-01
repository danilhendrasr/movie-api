import { createMock } from '@golevelup/ts-jest';
import { Cast } from 'src/casts/casts.entity';
import { CastsService } from 'src/casts/casts.service';
import { CreateCastDTO } from 'src/casts/dto/create-cast.dto';
import { UpdateCastDTO } from 'src/casts/dto/update-cast.dto';
import { Movie } from 'src/movies/movies.entity';
import { MoviesService } from 'src/movies/movies.service';
import { EntityNotFoundError, FindOptionsWhere, Repository } from 'typeorm';
import { castsArray, moviesArray, oneCast, oneMovie } from './constants';

export const movieServiceMock = createMock<MoviesService>({
  getAllMovies: jest.fn().mockResolvedValue(moviesArray),
  getOneMovie: jest.fn(async (id: number) => {
    if (id < 0) {
      throw new EntityNotFoundError(
        Movie,
        'Could not find entity of type matching blabla.',
      );
    }

    return oneMovie;
  }),
  getCasts: jest.fn(async (id: number) => {
    if (id < 0) {
      throw new EntityNotFoundError(
        Movie,
        'Could not find entity of type matching blabla.',
      );
    }

    return castsArray;
  }),
  updateMovie: jest.fn(async (id: number, payload: Partial<Movie>) => {
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
  createNewMovie: jest.fn(async (movie: Partial<Movie>) => {
    return {
      id: 1,
      ...movie,
    } as Movie;
  }),
  deleteMovie: jest.fn(async (id: number) => {
    if (id < 0) {
      throw new EntityNotFoundError(
        Movie,
        'Could not find entity of type matching blabla.',
      );
    }
  }),
});

export const movieRepoMock = createMock<Repository<Movie>>({
  find: jest.fn(async () => {
    return moviesArray;
  }),
  findOneByOrFail: jest.fn(async (params: FindOptionsWhere<Movie>) => {
    if (params.id < 0) {
      throw new EntityNotFoundError(Movie, 'Movie cannot be found.');
    }
    return oneMovie;
  }),
  save: jest.fn(async (entity: Partial<Movie>) => {
    if (entity.id === undefined || entity.id === null) {
      entity.id = Math.ceil(Math.random());
    }

    return entity as Movie;
  }),
  delete: jest.fn(async (id: number) => {
    if (id < 0) {
      throw new EntityNotFoundError(Movie, 'Movie cannot be found.');
    }

    return {
      affected: 1,
      raw: '',
    };
  }),
});

export const castsServiceMock = createMock<CastsService>({
  getCasts: jest.fn().mockResolvedValue(castsArray),
  getOneCast: jest.fn(async (castId: number) => {
    if (castId < 0) {
      throw new EntityNotFoundError(
        Cast,
        'Cannot find Cast entity with ID: ' + castId,
      );
    }

    return oneCast;
  }),
  getMoviesOfACast: jest.fn().mockResolvedValue(moviesArray),
  createNewCast: jest.fn(async (payload: CreateCastDTO) => {
    return {
      id: 1,
      ...payload,
    };
  }),
  updateCast: jest.fn(async (id: number, payload: UpdateCastDTO) => {
    if (id < 0) {
      throw new EntityNotFoundError(
        Cast,
        'Cannot find Cast entity with ID: ' + id,
      );
    }

    return {
      ...oneCast,
      ...payload,
    };
  }),
});

export const castRepoMock = createMock<Repository<Cast>>({
  find: jest.fn().mockResolvedValue(castsArray),
  findOneByOrFail: jest.fn(async (params: FindOptionsWhere<Cast>) => {
    if (params.id < 0) {
      throw new EntityNotFoundError(
        Cast,
        'Cannot find Cast entity with ID: ' + params.id,
      );
    }

    return oneCast;
  }),
  delete: jest.fn(async (id: number) => {
    if (id < 0) {
      throw new EntityNotFoundError(
        Cast,
        'Cannot find Cast entity with ID: ' + id,
      );
    }

    return {
      affected: 1,
      raw: '',
    };
  }),
  save: jest.fn(async (entity: Partial<Cast>) => {
    if (entity.id === undefined || entity.id === null) {
      entity.id = Math.ceil(Math.random());
    }

    return entity as Cast;
  }),
});
