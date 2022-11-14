import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from 'src/movies/movies.entity';
import { CastsController } from '../casts.controller';
import { Cast } from '../casts.entity';
import { CastsService } from '../casts.service';

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

const oneCast: Cast = {
  id: 1,
  name: 'Danil Hendra',
};

describe('CastsController', () => {
  let controller: CastsController;
  let castsService: CastsService;
  const castsServiceMock: Record<keyof CastsService, () => any> = {
    getCasts: jest.fn().mockResolvedValue(castsArray),
    getOneCast: jest.fn().mockResolvedValue(oneCast),
    getMoviesOfACast: jest.fn().mockResolvedValue(moviesArray),
    createNewCast: jest.fn(),
    updateCast: jest.fn(),
    deleteCast: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastsController],
      providers: [
        {
          provide: CastsService,
          useValue: castsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<CastsController>(CastsController);
    castsService = module.get<CastsService>(CastsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all', () => {
    it('should return an array of movies', () => {
      expect(controller.getCasts()).resolves.toBe(castsArray);
    });
  });

  describe('get one', () => {
    it('should return one cast', () => {
      expect(controller.getOneCast(1)).resolves.toBe(oneCast);
    });
  });

  describe('get movies of a cast', () => {
    it('should return an array of movies', () => {
      expect(controller.getMoviesOfACast(1)).resolves.toBe(moviesArray);
    });
  });

  describe('create cast', () => {
    it('should call create cast service with given payload', () => {
      const createMovieServiceSpy = jest.spyOn(castsService, 'createNewCast');
      controller.createCast(oneCast);
      expect(createMovieServiceSpy).toBeCalledWith(oneCast);
    });
  });

  describe('delete a cast', () => {
    it('should call delete a cast service with given payload', () => {
      const createMovieServiceSpy = jest.spyOn(castsService, 'deleteCast');
      controller.deleteCast(1);
      expect(createMovieServiceSpy).toBeCalledWith(1);
    });
  });
});
