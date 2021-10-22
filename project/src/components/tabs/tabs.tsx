import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import TabDetails from '../tab-details/tab-details';
import TabOverview from '../tab-overview/tab-overview';
import TabReviews from '../tab-reviews/tab-reviews';

type TabsProps = {
  film: Film;
}

type PossibleTabs = '#overview' | '#details' | '#reviews';

function Tabs({ film }: TabsProps): JSX.Element {
  const location = useLocation();
  const currentTab: PossibleTabs = location.hash as PossibleTabs || '#overview';

  const getTab = () => {
    switch (currentTab) {
      case '#overview':
        return <TabOverview film={film} />;
      case '#details':
        return <TabDetails film={film} />;
      case '#reviews':
        return <TabReviews />;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item${currentTab === '#overview' ? ' film-nav__item--active' : ''}`}>
            <Link to={`${location.pathname}#overview`} className="film-nav__link">Overview</Link>
          </li>
          <li className={`film-nav__item${currentTab === '#details' ? ' film-nav__item--active' : ''}`}>
            <Link to={`${location.pathname}#details`} className="film-nav__link">Details</Link>
          </li>
          <li className={`film-nav__item${currentTab === '#reviews' ? ' film-nav__item--active' : ''}`}>
            <Link to={`${location.pathname}#reviews`} className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>

      {getTab()}
    </div>
  );
}

export default Tabs;
