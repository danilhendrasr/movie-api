import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';
import { EntityNotFoundError } from 'typeorm';

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
    return this.moviesService.getAllMovies();
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
  async getOneMovie(@Param('id') id: number, @Res() res: Response) {
    try {
      const movie = await this.moviesService.getOneMovie(id);
      return movie;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        res.status(HttpStatus.NOT_FOUND).send();
      }
    }
  }

  @Patch(':id')
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
  async updateMovie(
    @Param('id') id: number,
    @Body() payload: UpdateMovieDTO,
    @Res() res: Response,
  ) {
    try {
      return await this.moviesService.updateMovie(id, payload);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        res.status(HttpStatus.NOT_FOUND).send();
      }
    }
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
  async deleteMovie(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.moviesService.deleteMovie(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        res.status(HttpStatus.NOT_FOUND).send();
      }
    }
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
  async getMovieCasts(@Param('id') id: number, @Res() res: Response) {
    try {
      return this.moviesService.getCasts(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        res.status(HttpStatus.NOT_FOUND).send();
      }
    }
  }
}
