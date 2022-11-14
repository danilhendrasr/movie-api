import { Test, TestingModule } from '@nestjs/testing';
import { Cast } from 'src/casts/casts.entity';
import { MoviesController } from '../movies.controller';
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
  const serviceMocks: Record<keyof MoviesService, () => any> = {
    getAllMovies: jest.fn().mockResolvedValue(moviesArray),
    getOneMovie: jest.fn().mockResolvedValue(oneMovie),
    getMovieCasts: jest.fn().mockResolvedValue(castsArray),
    updateMovie: jest.fn(),
    createNewMovie: jest.fn(),
    deleteMovie: jest.fn(),
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all', () => {
    it('should return an array of movies', () => {
      expect(controller.getMovies()).resolves.toBe(moviesArray);
    });
  });

  describe('get one', () => {
    it('should return one movie', () => {
      expect(controller.getOneMovie(1)).resolves.toBe(oneMovie);
    });
  });

  describe('get casts of a movie', () => {
    it('should return an array of casts', () => {
      expect(controller.getMovieCasts(1)).resolves.toBe(castsArray);
    });
  });

  describe('create movie', () => {
    it('should call create movie service with given payload', () => {
      const createMovieServiceSpy = jest.spyOn(service, 'createNewMovie');
      controller.createMovie({ name: 'The Girl On The Train' });
      expect(createMovieServiceSpy).toBeCalledWith({
        name: 'The Girl On The Train',
      });
    });
  });

  describe('update a movie', () => {
    it('should call create movie service with given payload', () => {
      const createMovieServiceSpy = jest.spyOn(service, 'updateMovie');
      controller.updateMovie(1, { name: 'Batman: Vengeance' });
      expect(createMovieServiceSpy).toBeCalledWith(1, {
        name: 'Batman: Vengeance',
      });
    });
  });

  describe('delete a movie', () => {
    it('should call delete a movie service with given payload', () => {
      const createMovieServiceSpy = jest.spyOn(service, 'deleteMovie');
      controller.deleteMovie(1);
      expect(createMovieServiceSpy).toBeCalledWith(1);
    });
  });
});
