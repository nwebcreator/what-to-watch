import { ApiResponse } from '../store/api-actions';
import { Film } from '../types/film';

export const mapDataToFilm = (it: ApiResponse): Film => ({
  id: it['id'] as number,
  name: it['name'] as string,
  posterImage: it['poster_image'] as string,
  previewImage: it['preview_image'] as string,
  backgroundImage: it['background_image'] as string,
  backgroundColor: it['background_color'] as string,
  videoLink: it['video_link'] as string,
  previewVideoLink: it['preview_video_link'] as string,
  description: it['description'] as string,
  rating: it['rating'] as number,
  scoresCount: it['scores_count'] as number,
  director: it['director'] as string,
  starring: it['starring'] as string[],
  runTime: it['run_time'] as number,
  genre: it['genre'] as string,
  released: it['released'] as number,
  isFavorite: it['is_favorite'] as boolean,
}) as Film;
