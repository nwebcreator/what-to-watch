import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../store/root-reducer';
import ToPlayerButton from './to-player-button';

const mockStore = configureMockStore();

describe('Component: ToPlayerButton', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
    });

    const { container } = render(
      <Provider store={store}>
        <ToPlayerButton filmId={1} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
