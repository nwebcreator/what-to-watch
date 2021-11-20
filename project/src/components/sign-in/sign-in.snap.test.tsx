import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../store/root-reducer';
import SignIn from './sign-in';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: SignIn', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <SignIn />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
