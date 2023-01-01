import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/movies.entity';
import { Repository } from 'typeorm';
import { Cast } from './casts.entity';

@Injectable()
export class CastsService {
  constructor(
    @InjectRepository(Cast) private castsRepository: Repository<Cast>,
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  async getCasts() {
    return await this.castsRepository.find();
  }

  async getMoviesOfACast(castId: number) {
    await this.castsRepository.findOneByOrFail({ id: castId });
    return await this.moviesRepository.find({
      where: {
        movieToCasts: { castId },
      },
      relations: { movieToCasts: true },
    });
  }

  async getOneCast(id: number) {
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
    await this.castsRepository.delete(id);
  }
}
