import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
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

  @Get()
  async getOneCast() {
    return 'Get one cast';
  }

  @Get()
  async getCastsOfAMovie() {
    return 'Get casts of a movie';
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
