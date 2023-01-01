import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cast } from 'src/casts/casts.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Movie } from '../movies.entity';
import { MoviesService } from '../movies.service';
import { createMock } from '@golevelup/ts-jest';
import { moviesArray, oneMovie, castsArray } from 'src/shared/test/constants';
import { movieRepoMock } from 'src/shared/test/mocks';

describe('MoviesService', () => {
  let service: MoviesService;
  let moviesRepository: Repository<Movie>;

  const castRepoMock = createMock<Repository<Cast>>({
    find: jest.fn().mockResolvedValue(castsArray),
    findOneByOrFail: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: getRepositoryToken(Movie), useValue: movieRepoMock },
        { provide: getRepositoryToken(Cast), useValue: castRepoMock },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get many movies', () => {
    it('should return an array of movies', async () => {
      const result = await service.getAllMovies();
      expect(movieRepoMock.find).toHaveBeenCalled();
      expect(result).toEqual(moviesArray);
    });
  });

  describe('get one movie', () => {
    it('should return a single movie', async () => {
      const result = await service.getOneMovie(1);
      expect(movieRepoMock.findOneByOrFail).toBeCalledWith({ id: 1 });
      expect(result).toEqual(oneMovie);
    });

    it('should throw EntityNotFoundError if movie not found', async () => {
      const movieId = -1;
      await expect(service.getOneMovie(movieId)).rejects.toBeInstanceOf(
        EntityNotFoundError,
      );
    });
  });

  describe('get casts of a movie', () => {
    it('should return an array of casts', async () => {
      const casts = await service.getCasts(1);
      expect(castRepoMock.find).toHaveBeenCalled();
      expect(casts).toEqual(castsArray);
    });

    it('should throw EntityNotFoundError if movie not found', async () => {
      const movieId = -1;
      await expect(service.getCasts(movieId)).rejects.toBeInstanceOf(
        EntityNotFoundError,
      );
    });
  });

  describe('create a new movie', () => {
    it('should return full entity of the created movie', async () => {
      const payload = { name: 'Testing' };
      const result = await service.createNewMovie(payload);
      expect(movieRepoMock.save).toBeCalledWith(payload);
      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
        }),
      );
    });
  });

  describe('update a movie', () => {
    it('should return updated movie', async () => {
      const movieId = 1;
      const payload = { name: 'Testing' };
      const expectedResult = { ...oneMovie, ...payload };
      const result = await service.updateMovie(movieId, payload);
      expect(movieRepoMock.findOneByOrFail).toBeCalledWith({ id: movieId });
      expect(movieRepoMock.save).toBeCalledWith(expectedResult);
      expect(result).toEqual(expectedResult);
    });

    it('should throw EntityNotFoundError if movie not found', async () => {
      const movieId = -1;
      await expect(
        service.updateMovie(movieId, { name: 'Testing' }),
      ).rejects.toBeInstanceOf(EntityNotFoundError);
    });
  });

  describe('delete a movie', () => {
    it('should call delete with the passed value', async () => {
      const deleteSpy = jest.spyOn(moviesRepository, 'delete');
      const result = await service.deleteMovie(1);
      expect(deleteSpy).toBeCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw EntityNotFoundError if movie not found', async () => {
      const movieId = -1;
      await expect(service.deleteMovie(movieId)).rejects.toBeInstanceOf(
        EntityNotFoundError,
      );
    });
  });
});
