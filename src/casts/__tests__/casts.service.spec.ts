import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from 'src/movies/movies.entity';
import { castsArray, moviesArray, oneCast } from 'src/shared/test/constants';
import { castRepoMock, movieRepoMock } from 'src/shared/test/mocks';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Cast } from '../casts.entity';
import { CastsService } from '../casts.service';

describe('CastsService', () => {
  let service: CastsService;
  let castsRepository: Repository<Cast>;
  let moviesRepository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CastsService,
        { provide: getRepositoryToken(Cast), useValue: castRepoMock },
        { provide: getRepositoryToken(Movie), useValue: movieRepoMock },
      ],
    }).compile();

    service = module.get<CastsService>(CastsService);
    castsRepository = module.get<Repository<Cast>>(getRepositoryToken(Cast));
    moviesRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find many casts', () => {
    it('should return an array of casts', async () => {
      const result = await service.getCasts();
      expect(castsRepository.find).toHaveBeenCalled();
      expect(result).toEqual(castsArray);
    });
  });

  describe('find one cast', () => {
    it('should return a single cast', async () => {
      const result = await service.getOneCast(1);
      expect(castsRepository.findOneByOrFail).toBeCalledWith({ id: 1 });
      expect(result).toEqual(oneCast);
    });

    it('should throw EntityNotFoundError if cast not found', async () => {
      const castId = -1;
      await expect(service.getOneCast(castId)).rejects.toThrow(
        EntityNotFoundError,
      );
    });
  });

  describe('get movies of a cast', () => {
    it('should return an array of movies', async () => {
      const castId = 1;
      const result = await service.getMoviesOfACast(castId);
      expect(moviesRepository.find).toHaveBeenCalled();
      expect(result).toEqual(moviesArray);
    });

    it('should throw EntityNotFoundError if cast not found', async () => {
      const castId = -1;
      await expect(service.getMoviesOfACast(castId)).rejects.toThrow(
        EntityNotFoundError,
      );
    });
  });

  describe('create a cast', () => {
    it('should return the full created cast object', async () => {
      const payload = { name: 'Testing' };
      const result = await service.createNewCast(payload);
      expect(castRepoMock.save).toBeCalledWith(payload);
      expect(result).toEqual(
        expect.objectContaining({ id: expect.any(Number) }),
      );
    });
  });

  describe('update a cast', () => {
    it('should return the updated cast', async () => {
      const castId = 1;
      const payload = { name: 'Testing' };
      const expectedResult = { ...oneCast, ...payload };
      const result = await service.updateCast(castId, payload);
      expect(castRepoMock.findOneByOrFail).toBeCalledWith({ id: castId });
      expect(castRepoMock.save).toBeCalledWith(expectedResult);
      expect(result).toEqual(expectedResult);
    });

    it('should throw EntityNotFoundError if cast not found', async () => {
      const castId = -1;
      await expect(service.updateCast(castId, oneCast)).rejects.toThrow(
        EntityNotFoundError,
      );
    });
  });

  describe('delete a cast', () => {
    it('should call delete and have no return value', async () => {
      const result = await service.deleteCast(1);
      expect(castsRepository.delete).toBeCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw EntityNotFoundError if cast not found', async () => {
      const castId = -1;
      await expect(service.deleteCast(castId)).rejects.toThrow(
        EntityNotFoundError,
      );
    });
  });
});
