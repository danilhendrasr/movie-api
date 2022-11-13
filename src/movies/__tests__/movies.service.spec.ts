import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movies.entity';
import { MoviesService } from '../movies.service';

const moviesArray: Movie[] = [
  {
    id: 1,
    name: 'The Girl On The Train',
    rating: 3,
    language: 'english',
  },
];

const oneMovie: Movie = {
  id: 1,
  name: 'The Girl On The Train',
  rating: 3,
  language: 'english',
};

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn().mockResolvedValue(moviesArray),
            findOneByOrFail: jest.fn().mockResolvedValue(oneMovie),
            delete: jest.fn((id) => {
              if (id === 1) return;
              throw new Error('error');
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array of movies', async () => {
      const movies = await service.getAllMovies();
      expect(movies).toEqual(moviesArray);
    });
  });

  describe('getOne()', () => {
    it('should return a single movie', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneByOrFail');
      expect(service.getOneMovie(1)).resolves.toEqual(oneMovie);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('delete()', () => {
    it('should call delete with the passed value', async () => {
      const deleteSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.deleteMovie(1);
      expect(deleteSpy).toBeCalledWith(1);
      expect(retVal).toBeUndefined();
    });

    it('should reject the promise if movie repo throws error', async () => {
      const movieId = 2;
      expect(service.deleteMovie(movieId)).rejects.toBeInstanceOf(Error);
    });
  });
});
