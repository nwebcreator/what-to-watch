import { ALL_GENRES_NAME, AuthorizationStatus, FILMS_PER_STEP } from '../const';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const initialState: State = {
  activeGenre: ALL_GENRES_NAME,
  sourcedFilms: [],
  films: [],
  showedFilms: FILMS_PER_STEP,
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: undefined,
  isDataLoaded: false,
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
    case ActionType.LoadFilms: {
      const sourcedFilms = [...action.payload.films];
      const films = [...sourcedFilms];
      return { ...state, sourcedFilms, films, isDataLoaded: true };
    }
    case ActionType.RequireAuthorization: {
      return { ...state, authorizationStatus: action.payload.authorizationStatus, authInfo: action.payload.authInfo };
    }
    case ActionType.RequireLogout: {
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth, authInfo: undefined };
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
