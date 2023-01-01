import { createMock } from '@golevelup/ts-jest';
import { Movie } from 'src/movies/movies.entity';
import { MoviesService } from 'src/movies/movies.service';
import { EntityNotFoundError, FindOptionsWhere, Repository } from 'typeorm';
import { castsArray, moviesArray, oneMovie } from './constants';

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
