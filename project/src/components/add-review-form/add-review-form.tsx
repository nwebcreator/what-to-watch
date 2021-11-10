import { FormEvent, useRef, useState } from 'react';
import { AddReview } from '../../types/add-review';

type AddReviewFromProps = {
  onSubmit: (review: AddReview) => void,
};

export default function AddReviewForm({ onSubmit }: AddReviewFromProps): JSX.Element {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState(5);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (commentRef.current !== null && commentRef.current.value) {
      if (rating !== undefined) {
        onSubmit({
          rating: rating,
          comment: commentRef.current.value,
        });
      }
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
          <textarea ref={commentRef} className="add-review__textarea" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}
