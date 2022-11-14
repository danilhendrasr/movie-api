import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CastsService } from './casts.service';
import { CreateCastDTO } from './dto/create-cast.dto';

@ApiTags('Casts')
@Controller({
  path: 'casts',
  version: '1',
})
export class CastsController {
  constructor(private castsService: CastsService) {}

  @Get()
  @ApiOperation({ summary: 'Get casts.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully got the records.',
  })
  async getCasts() {
    return this.castsService.getCasts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single cast by ID.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully got the records.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cast with the given ID cannot be found.',
  })
  async getOneCast(@Param('id') id: number) {
    return this.castsService.getOneCast(id);
  }

  @Get(':id/movies')
  @ApiOperation({ summary: 'Get movies that a cast has played in.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully got the records.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cast with the given ID cannot be found.',
  })
  async getMoviesOfACast(@Param('id') id: number) {
    return this.castsService.getMoviesOfACast(id);
  }

  @Patch()
  async updateCast() {
    return 'Update a cast';
  }

  @Post()
  @ApiOperation({ summary: 'Create a new cast.' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created the record.',
  })
  @ApiResponse({
    status: 400,
    description: 'Request body is not valid, please recheck.',
  })
  async createCast(@Body() payload: CreateCastDTO) {
    return this.castsService.createNewCast(payload);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a cast.' })
  @ApiResponse({
    status: 204,
    description: 'Successfully deleted the record.',
  })
  @ApiResponse({
    status: 404,
    description: 'A cast with the given ID cannot be found.',
  })
  async deleteCast(@Param('id') id: number) {
    return this.castsService.deleteCast(id);
  }
}
