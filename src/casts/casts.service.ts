import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseError } from 'src/shared/errors/database.error';
import { Repository } from 'typeorm';
import { Cast } from './casts.entity';

@Injectable()
export class CastsService {
  constructor(
    @InjectRepository(Cast) private castsRepository: Repository<Cast>,
  ) {}

  async find() {
    return await this.castsRepository.find();
  }

  async findOne(id: number) {
    return await this.castsRepository.findOneByOrFail({ id });
  }

  async createNewCast(payload: Omit<Cast, 'id' | 'movieToCasts'>) {
    return await this.castsRepository.save(payload);
  }

  async updateCast(
    id: number,
    payload: Partial<Omit<Cast, 'id' | 'movietoCasts'>>,
  ) {
    const cast = await this.castsRepository.findOneByOrFail({ id });
    return await this.castsRepository.save({
      ...cast,
      ...payload,
    });
  }

  async deleteCast(id: number) {
    await this.castsRepository.findOneByOrFail({ id });

    try {
      await this.castsRepository.delete(id);
    } catch (e) {
      return Promise.reject(new DatabaseError('Failed deleting cast.'));
    }
  }
}