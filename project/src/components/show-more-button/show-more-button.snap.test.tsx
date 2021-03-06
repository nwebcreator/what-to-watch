import { render } from '@testing-library/react';
import ShowMoreButton from './show-more-button';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {
    const { container } = render(<ShowMoreButton onClick={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
