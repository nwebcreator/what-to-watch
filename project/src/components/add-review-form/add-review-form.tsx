import { FormEvent, useState } from 'react';
import { AddReview } from '../../types/add-review';

type AddReviewFromProps = {
  onSubmit: (review: AddReview) => void,
};

export default function AddReviewForm({ onSubmit }: AddReviewFromProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (rating !== undefined && comment) {
      onSubmit({
        rating: rating,
        comment: comment,
      });
    }
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: 10 }, (_, i) => i + 1).reverse().map((it) => (
              [
                <input key={`input-${it}`} className="rating__input" id={`star-${it}`} type="radio" name="rating" value={it} checked={rating === it} onChange={() => setRating(it)} />,
                <label key={`label-${it}`} className="rating__label" htmlFor={`star-${it}`}>Rating {it}</label>,
              ]
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" defaultValue={comment} onChange={(evt) => setComment(evt.target.value)}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}
