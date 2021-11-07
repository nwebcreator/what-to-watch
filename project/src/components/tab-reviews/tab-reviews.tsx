import { Reviews } from '../../types/review';
import { formatReviewDate } from '../../utils';

type TabReviewProps = {
  reviews: Reviews;
}

function TabReviews({ reviews }: TabReviewProps): JSX.Element {
  const middleIndex = Math.round(reviews.length / 2);
  const firstBlockReviews = reviews.slice(0, middleIndex);
  const secondBlockReviews = reviews.slice(middleIndex);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstBlockReviews.map((it) => (
          <div key={it.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{it.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{it.user.name}</cite>
                <time className="review__date" dateTime={it.date}>{formatReviewDate(it.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{it.rating}</div>
          </div>))}
      </div>
      <div className="film-card__reviews-col">
        {secondBlockReviews.map((it) => (
          <div key={it.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{it.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{it.user.name}</cite>
                <time className="review__date" dateTime={it.date}>{formatReviewDate(it.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{it.rating}</div>
          </div>))}
      </div>
    </div>
  );
}

export default TabReviews;
