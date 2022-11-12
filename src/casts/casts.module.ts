import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cast } from './casts.entity';
import { CastsController } from './casts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  exports: [TypeOrmModule],
  controllers: [CastsController],
})
export class CastsModule {}
