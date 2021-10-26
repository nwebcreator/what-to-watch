import { allGenresName } from '../const';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const initialState: State = {
  activeGenre: allGenresName,
  sourcedFilms: [],
  films: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre: {
      const activeGenre = action.payload;
      if (activeGenre === allGenresName) {
        return { ...state, activeGenre, films: [...state.sourcedFilms] };
      }

      return { ...state, activeGenre, films: [...state.sourcedFilms].filter(((it) => it.genre === activeGenre)) };
    }
    case ActionType.StoreFilms: {
      const sourcedFilms = [...action.payload];
      const films = [...sourcedFilms];
      return { ...state, sourcedFilms, films };
    }
    default:
      return state;
  }
};

export { reducer };
