import { FormEvent, useMemo, useState } from 'react';
import { AddReview } from '../../types/add-review';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

type AddReviewFromProps = {
  onSubmit: (review: AddReview) => void,
};

export default function AddReviewForm({ onSubmit }: AddReviewFromProps): JSX.Element {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const isFormValid = useMemo(() => rating > 0 && comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH, [rating, comment]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isFormValid) {
      onSubmit({
        rating,
        comment,
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
          <textarea className="add-review__textarea" placeholder="Review text" maxLength={MAX_COMMENT_LENGTH} defaultValue={comment} onChange={(evt) => setComment(evt.target.value)}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!isFormValid}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}
