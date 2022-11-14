import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cast } from './casts.entity';
import { CastsController } from './casts.controller';
import { CastsService } from './casts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  exports: [TypeOrmModule],
  controllers: [CastsController],
  providers: [CastsService],
})
export class CastsModule {}
