import { name, datatype, internet } from 'faker';
import { ApiResponse } from '../store/api-actions';

export const makeFakeFilm = (): ApiResponse => ({
  'id': datatype.number(),
  'name': name.title(),
  'poster_image': internet.url(),
  'preview_image': internet.url(),
  'background_image': internet.url(),
  'background_color': internet.color(),
  'video_link': internet.url(),
  'preview_video_link': internet.url(),
  'description': datatype.string(),
  'rating': datatype.number(),
  'scores_count': datatype.number(),
  'director': name.title(),
  'starring': Array.from<string>({ length: 3 }).fill(name.title()),
  'run_time': datatype.number(),
  'genre': datatype.string(),
  'released': datatype.number(),
  'is_favorite': datatype.boolean(),
});

export const makeFakeReview = (): ApiResponse =>({
  id: datatype.number(),
  comment: datatype.string(),
  date: datatype.datetime().toISOString(),
  rating: datatype.number(),
  user: {
    id: datatype.number(),
    name: name.title(),
  },
});
