import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller({
  path: 'movies',
  version: '1',
})
export class MoviesController {
  @Get()
  async getMovies() {
    return 'Get movies';
  }

  @Get()
  async getOneMovie() {
    return 'Get one movie';
  }

  @Patch()
  async updateMovie() {
    return 'Update a movie';
  }

  @Post()
  async createMovie() {
    return 'Create a movie';
  }

  @Delete()
  async deleteMovie() {
    return 'Delete a movie';
  }
}
