import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cast } from './casts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  exports: [TypeOrmModule],
})
export class CastsModule {}
