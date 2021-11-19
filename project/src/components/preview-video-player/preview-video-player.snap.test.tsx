import { render } from '@testing-library/react';
import PreviewVideoPlayer from './preview-video-player';

describe('Component: PreviewVideoPlayer', () => {
  it('should render correctly', () => {
    const { container } = render(<PreviewVideoPlayer src='' />);
    expect(container).toMatchSnapshot();
  });
});
