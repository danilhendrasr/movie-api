import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Casts')
@Controller({
  path: 'casts',
  version: '1',
})
export class CastsController {
  @Get()
  async getCasts() {
    return 'Get casts';
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
