import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CastsService } from './casts.service';

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
  async createCast() {
    return 'Create a cast';
  }

  @Delete()
  async deleteCast() {
    return 'Delete a cast';
  }
}
