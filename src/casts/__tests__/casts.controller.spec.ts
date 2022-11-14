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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all', () => {
    it('should return an array of movies', () => {
      expect(controller.getCasts()).resolves.toBe(castsArray);
    });
  });
});
