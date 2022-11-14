import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Cast } from './casts.entity';

@Injectable()
export class CastsSeeder implements Seeder {
  constructor(
    @InjectRepository(Cast) private readonly casts: Repository<Cast>,
  ) {}

  async seed(): Promise<any> {
    const movies = DataFactory.createForClass(Cast).generate(10);
    return this.casts.save(movies);
  }

  async drop(): Promise<any> {
    return this.casts.delete({});
  }
}
