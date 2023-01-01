import { getMockRes } from '@jest-mock/express';
import { Cast } from 'src/casts/casts.entity';
import { Movie } from 'src/movies/movies.entity';

export const moviesArray: Movie[] = [
  {
    id: 1,
    name: 'The Girl On The Train',
    rating: 3,
    language: 'english',
  },
];

export const castsArray: Cast[] = [
  {
    id: 1,
    name: 'Danil Hendra',
  },
];

export const oneCast: Cast = {
  id: 1,
  name: 'Danil Hendra',
};

export const oneMovie: Movie = {
  id: 1,
  name: 'The Girl On The Train',
  rating: 3,
  language: 'english',
};

export const mockRes = getMockRes();
