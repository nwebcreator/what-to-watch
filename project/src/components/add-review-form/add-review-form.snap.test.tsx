import { render } from '@testing-library/react';
import AddReviewForm from './add-review-form';

describe('Component: AddReviewForm', () => {
  test('should render correctly', () => {
    const { container } = render(<AddReviewForm onSubmit={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
