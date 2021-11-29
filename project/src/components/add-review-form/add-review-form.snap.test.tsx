import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../store/root-reducer';
import AddReviewForm from './add-review-form';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: AddReviewForm', () => {
  test('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
    });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <AddReviewForm filmId={1} />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
