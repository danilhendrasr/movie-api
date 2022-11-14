import { PartialType } from '@nestjs/swagger';
import { CreateCastDTO } from './create-cast.dto';

export class UpdateCastDTO extends PartialType(CreateCastDTO) {}
