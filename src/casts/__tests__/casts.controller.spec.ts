import { Test, TestingModule } from '@nestjs/testing';
import { castsArray, moviesArray, oneCast } from 'src/shared/test/constants';
import { castsServiceMock } from 'src/shared/test/mocks';
import { EntityNotFoundError } from 'typeorm';
import { CastsController } from '../casts.controller';
import { CastsService } from '../casts.service';

describe('CastsController', () => {
  let controller: CastsController;
  let castsService: CastsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastsController],
      providers: [{ provide: CastsService, useValue: castsServiceMock }],
    }).compile();

    controller = module.get<CastsController>(CastsController);
    castsService = module.get<CastsService>(CastsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all', () => {
    it('should return an array of movies', async () => {
      const result = await controller.getCasts();
      expect(castsService.getCasts).toHaveBeenCalled();
      expect(result).toEqual(castsArray);
    });
  });

  describe('get one', () => {
    it('should return one cast', async () => {
      const castId = 1;
      const result = await controller.getOneCast(castId);
      expect(castsService.getOneCast).toHaveBeenCalledWith(castId);
      expect(result).toEqual(oneCast);
    });

    it('should throw EntityNotFoundError if cast cannot be found', async () => {
      const castId = -1;
      await expect(controller.getOneCast(castId)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(castsService.getOneCast).toHaveBeenCalledWith(castId);
    });
  });

  describe('get movies of a cast', () => {
    it('should return an array of movies', async () => {
      const result = await controller.getMoviesOfACast(1);
      expect(castsService.getMoviesOfACast).toHaveBeenCalled();
      expect(result).toEqual(moviesArray);
    });

    it('should throw EntityNotFoundError if cast cannot be found', async () => {
      const castId = -1;
      await expect(controller.getMoviesOfACast(castId)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(castsService.getMoviesOfACast).toHaveBeenCalledWith(castId);
    });
  });

  describe('create cast', () => {
    it('should call create cast service with given payload', async () => {
      const payload = { name: 'Danil Hendra Suryawan' };
      const result = await controller.createCast(payload);
      expect(castsService.createNewCast).toBeCalledWith(payload);
      expect(result).toEqual(
        expect.objectContaining({ id: expect.any(Number) }),
      );
    });
  });

  describe('update a cast', () => {
    it('should return the updated cast', async () => {
      const castId = 1;
      const payload = { name: 'Admin' };
      const result = await controller.updateCast(castId, payload);
      expect(castsService.updateCast).toBeCalledWith(castId, payload);
      expect(result).toEqual({ ...oneCast, ...payload });
    });

    it('should throw EntityNotFoundError if cast cannot be found', async () => {
      const payload = { name: 'Admin' };
      const castId = -1;
      await expect(controller.updateCast(castId, payload)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(castsService.updateCast).toHaveBeenCalledWith(castId, payload);
    });
  });

  describe('delete a cast', () => {
    it('should call delete a cast service with given payload', () => {
      const createMovieServiceSpy = jest.spyOn(castsService, 'deleteCast');
      controller.deleteCast(1);
      expect(createMovieServiceSpy).toBeCalledWith(1);
    });

    it('should throw EntityNotFoundError if cast cannot be found', async () => {
      const castId = -1;
      await expect(controller.deleteCast(castId)).rejects.toThrow(
        EntityNotFoundError,
      );
      expect(castsService.deleteCast).toHaveBeenCalledWith(castId);
    });
  });
});
