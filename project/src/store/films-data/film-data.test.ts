import { filmsData } from './films-data';
import { ActionType } from '../../types/action';
import { ALL_GENRES_NAME } from '../../const';
import { FilmsData } from '../../types/state';
import { music, datatype } from 'faker';
import { makeFakeFilm } from '../../utils/mocks';
import { mapDataToFilm } from '../../mappers/film-mapper';

describe('Reducer: data', () => {
  const initialState: FilmsData = {
    activeGenre: ALL_GENRES_NAME,
    films: [],
    favoriteFilms: [],
    reviews: [],
    similarFilms: [],
    film: undefined,
    promoFilm: undefined,
    showedFilms: 0,
    isDataLoaded: false,
  };

  it('should update activeGenre', () => {
    const changeGenre = {
      type: ActionType.ChangeGenre,
      payload: music.genre(),
    };

    const state = initialState;

    expect(filmsData(state, changeGenre))
      .toEqual({ ...state, ...{ activeGenre: changeGenre.payload } });
  });

  it('should update films and isDataLoaded to true', () => {
    const loadFilms = {
      type: ActionType.LoadFilms,
      payload: { films: [makeFakeFilm(), makeFakeFilm()].map(mapDataToFilm) },
    };

    const state = initialState;

    expect(filmsData(state, loadFilms))
      .toEqual({ ...state, ...{ films: loadFilms.payload.films, isDataLoaded: true } });
  });

  it('should update loadFavoriteFilms', () => {
    const loadFavoriteFilms = {
      type: ActionType.LoadFavoriteFilms,
      payload: { favoriteFilms: [makeFakeFilm(), makeFakeFilm()].map(mapDataToFilm) },
    };

    const state = initialState;

    expect(filmsData(state, loadFavoriteFilms))
      .toEqual({ ...state, ...{ favoriteFilms: loadFavoriteFilms.payload.favoriteFilms } });
  });

  it('should update promoFilm', () => {
    const loadPromoFilm = {
      type: ActionType.LoadPromoFilm,
      payload: { promoFilm: mapDataToFilm(makeFakeFilm())},
    };

    const state = initialState;

    expect(filmsData(state, loadPromoFilm))
      .toEqual({ ...state, ...{ promoFilm: loadPromoFilm.payload.promoFilm } });
  });

  it('should update film', () => {
    const loadFilm = {
      type: ActionType.LoadFilm,
      payload: { film: mapDataToFilm(makeFakeFilm()) },
    };

    const state = initialState;

    expect(filmsData(state, loadFilm))
      .toEqual({ ...state, ...{ film: loadFilm.payload.film } });
  });

  it('should update filmFavoriteStatus true', () => {
    const updateFilmFavoriteStatus = {
      type: ActionType.UpdateFilmFavoriteStatus,
      payload: { id: datatype.number(), isFavorite: true },
    };
    const film = mapDataToFilm(makeFakeFilm());
    film.id = updateFilmFavoriteStatus.payload.id;

    const promoFilm = mapDataToFilm(makeFakeFilm());
    promoFilm.id = updateFilmFavoriteStatus.payload.id;

    const state = { ...initialState, ...{ film, promoFilm } };

    expect(filmsData(state, updateFilmFavoriteStatus))
      .toEqual({ ...state, ...{ film: { ...film, isFavorite: true }, promoFilm: { ...promoFilm, isFavorite: true } } });
  });

  it('should update similar films', () => {
    const loadSimilarFilms = {
      type: ActionType.LoadSimilarFilms,
      payload: { similarFilms: [makeFakeFilm(), makeFakeFilm()].map(mapDataToFilm) },
    };

    const state = initialState;

    expect(filmsData(state, loadSimilarFilms))
      .toEqual({ ...state, ...{ similarFilms: loadSimilarFilms.payload.similarFilms } });
  });

  it('should update reviews', () => {
    const loadReviews = {
      type: ActionType.LoadReviews,
      payload: { reviews: [makeFakeFilm(), makeFakeFilm()].map(mapDataToFilm) },
    };

    const state = initialState;

    expect(filmsData(state, loadReviews))
      .toEqual({ ...state, ...{ reviews: loadReviews.payload.reviews } });
  });

  it('should update showedFilms', () => {
    const changeShowedFilms = {
      type: ActionType.ChangeShowedFilms,
      payload: datatype.number(),
    };

    const state = initialState;

    expect(filmsData(state, changeShowedFilms))
      .toEqual({ ...state, showedFilms: changeShowedFilms.payload });
  });
});
