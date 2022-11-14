import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatabaseError } from 'src/shared/errors/database.error';
import { Repository } from 'typeorm';
import { Cast } from '../casts.entity';
import { CastsService } from '../casts.service';

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

describe('CastsService', () => {
  let service: CastsService;
  let repository: Repository<Cast>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CastsService,
        {
          provide: getRepositoryToken(Cast),
          useValue: {
            find: jest.fn().mockResolvedValue(castsArray),
            findOneByOrFail: jest.fn().mockResolvedValue(oneCast),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn((id) => {
              if (id === 1) return;
              throw new Error('Delete failed.');
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CastsService>(CastsService);
    repository = module.get<Repository<Cast>>(getRepositoryToken(Cast));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find()', () => {
    it('should return an array of casts', async () => {
      const casts = await service.find();
      expect(casts).toEqual(castsArray);
    });
  });

  describe('findOne()', () => {
    it('should return a single cast', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneByOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneCast);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('createNewCast()', () => {
    it('should call save with the passed value', async () => {
      const deleteSpy = jest.spyOn(repository, 'save');
      await service.createNewCast(oneCast);
      expect(deleteSpy).toBeCalledWith(oneCast);
    });
  });

  describe('updateCast()', () => {
    it('should call save with the passed value', async () => {
      const deleteSpy = jest.spyOn(repository, 'save');
      await service.updateCast(1, oneCast);
      expect(deleteSpy).toBeCalledWith(oneCast);
    });
  });

  describe('deleteCast()', () => {
    it('should call delete with the passed value', async () => {
      const deleteSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.deleteCast(1);
      expect(deleteSpy).toBeCalledWith(1);
      expect(retVal).toBeUndefined();
    });

    it('should throw DatabaseError if delete failed', async () => {
      const deleteSpy = jest.spyOn(repository, 'delete');
      await expect(service.deleteCast(2)).rejects.toBeInstanceOf(DatabaseError);
      expect(deleteSpy).toBeCalledWith(2);
    });
  });
});
