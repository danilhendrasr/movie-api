import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { MovieStatus } from '../movies.types';

export class CreateMovieDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  language?: string;

  @ApiPropertyOptional({ enum: MovieStatus })
  @IsEnum(MovieStatus)
  @IsOptional()
  status?: MovieStatus;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  rating?: number;
}
