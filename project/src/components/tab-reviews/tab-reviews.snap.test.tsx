import { render } from '@testing-library/react';
import TabReviews from './tab-reviews';

describe('Component: TabReviews', () => {
  it('should render correctly', () => {
    const { container } = render(<TabReviews reviews={[]} />);
    expect(container).toMatchSnapshot();
  });
});
