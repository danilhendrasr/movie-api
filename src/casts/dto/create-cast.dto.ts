import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCastDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  birthday?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  deathDay?: Date;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  rating?: number;
}
