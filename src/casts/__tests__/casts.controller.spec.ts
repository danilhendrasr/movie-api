import { createMock } from '@golevelup/ts-jest';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  castsArray,
  mockRes,
  moviesArray,
  oneCast,
} from 'src/shared/test/constants';
import { EntityNotFoundError } from 'typeorm';
import { CastsController } from '../casts.controller';
import { Cast } from '../casts.entity';
import { CastsService } from '../casts.service';
import { CreateCastDTO } from '../dto/create-cast.dto';
import { UpdateCastDTO } from '../dto/update-cast.dto';

describe('CastsController', () => {
  let controller: CastsController;
  let castsService: CastsService;
  const res = mockRes.res;
  const castsServiceMock = createMock<CastsService>({
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
      const result = await controller.getOneCast(castId, res);
      expect(castsService.getOneCast).toHaveBeenCalledWith(castId);
      expect(result).toEqual(oneCast);
    });

    it('should set status code to 404 if cast cannot be found', async () => {
      const castId = -1;
      await controller.getOneCast(castId, res);
      expect(castsService.getOneCast).toHaveBeenCalledWith(castId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('get movies of a cast', () => {
    it('should return an array of movies', async () => {
      const result = await controller.getMoviesOfACast(1, res);
      expect(castsService.getMoviesOfACast).toHaveBeenCalled();
      expect(result).toEqual(moviesArray);
    });

    it('should set status code to 404 if cast cannot be found', async () => {
      const castId = -1;
      await controller.getMoviesOfACast(castId, res);
      expect(castsService.getMoviesOfACast).toHaveBeenCalledWith(castId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
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
      const result = await controller.updateCast(castId, payload, res);
      expect(castsService.updateCast).toBeCalledWith(castId, payload);
      expect(result).toEqual({ ...oneCast, ...payload });
    });

    it('should set status code to 404 if cast cannot be found', async () => {
      const payload = { name: 'Admin' };
      const castId = -1;
      await controller.updateCast(castId, payload, res);
      expect(castsService.updateCast).toHaveBeenCalledWith(castId, payload);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('delete a cast', () => {
    it('should call delete a cast service with given payload', () => {
      const createMovieServiceSpy = jest.spyOn(castsService, 'deleteCast');
      controller.deleteCast(1, res);
      expect(createMovieServiceSpy).toBeCalledWith(1);
    });

    it('should set status code to 404 if cast cannot be found', async () => {
      const castId = -1;
      await controller.deleteCast(castId, res);
      expect(castsService.deleteCast).toHaveBeenCalledWith(castId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });
});
