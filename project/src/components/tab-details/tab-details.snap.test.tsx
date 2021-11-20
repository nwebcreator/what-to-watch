import { render } from '@testing-library/react';
import TabDetails from './tab-details';

describe('Component: TabDetails', () => {
  it('should render correctly', () => {
    const film = {
      id: 1,
      name: 'string',
      posterImage: 'string',
      previewImage: 'string',
      backgroundImage: 'string',
      backgroundColor: 'string',
      videoLink: 'string',
      previewVideoLink: 'string',
      description: 'string',
      rating: 10,
      scoresCount: 10,
      director: 'string',
      starring: [],
      runTime: 10,
      genre: 'string',
      released: 2010,
      isFavorite: false,
    };
    const { container } = render(<TabDetails film={film} />);
    expect(container).toMatchSnapshot();
  });
});
