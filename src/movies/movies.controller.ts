import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@ApiTags('Movies')
@Controller({
  path: 'movies',
  version: '1',
})
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all movies.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully got the records.',
  })
  async getMovies() {
    return await this.moviesService.getAllMovies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one movie by ID.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully got the record.',
  })
  @ApiResponse({
    status: 404,
    description: "Movie with the given ID can't be found",
  })
  async getOneMovie(@Param('id') id: number) {
    return await this.moviesService.getOneMovie(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the record.',
  })
  @ApiResponse({
    status: 400,
    description: 'Request body is not valid, please recheck.',
  })
  @ApiResponse({
    status: 404,
    description: "Movie with the given ID can't be found",
  })
  async updateMovie(@Param('id') id: number, @Body() payload: UpdateMovieDTO) {
    return await this.moviesService.updateMovie(id, payload);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new movie.' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created the record.',
  })
  @ApiResponse({
    status: 400,
    description: 'Request body is not valid, please recheck.',
  })
  @HttpCode(HttpStatus.CREATED)
  async createMovie(@Body() payload: CreateMovieDTO) {
    return await this.moviesService.createNewMovie(payload);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a new movie.' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: "Movie with the given ID can't be found",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMovie(@Param('id') id: number) {
    await this.moviesService.deleteMovie(id);
  }

  @Get(':id/casts')
  @ApiOperation({ summary: 'Get casts of a movie.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully got the records.',
  })
  @ApiResponse({
    status: 404,
    description: "Movie with the given ID can't be found",
  })
  async getMovieCasts(@Param('id') id: number) {
    return await this.moviesService.getCasts(id);
  }
}
