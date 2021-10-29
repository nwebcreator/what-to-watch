import { ALL_GENRES_NAME, FILMS_PER_STEP } from '../const';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const initialState: State = {
  activeGenre: ALL_GENRES_NAME,
  sourcedFilms: [],
  films: [],
  showedFilms: FILMS_PER_STEP,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre: {
      const activeGenre = action.payload;
      if (activeGenre === ALL_GENRES_NAME) {
        return { ...state, activeGenre, films: [...state.sourcedFilms] };
      }

      return { ...state, activeGenre, films: [...state.sourcedFilms].filter(((it) => it.genre === activeGenre)) };
    }
    case ActionType.StoreFilms: {
      const sourcedFilms = [...action.payload];
      const films = [...sourcedFilms];
      return { ...state, sourcedFilms, films };
    }
    case ActionType.ChangeShowedFilms: {
      const showedFilms = action.payload;
      return { ...state, showedFilms };
    }
    default:
      return state;
  }
};

export { reducer };
