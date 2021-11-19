import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from './not-found';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
