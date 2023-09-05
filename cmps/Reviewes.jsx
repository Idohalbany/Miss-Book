import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'
import { RateMethod } from './RateMethod.jsx'
const { useState } = React

export function Reviewes({ bookId, onAddReview }) {
  const [review, setReview] = useState(bookService.getDefaultReview())
  const [ratingMethod, setRatingMethod] = useState('select')

  function handleChange({ target }) {
    const value = target.type === 'number' ? +target.value : target.value
    setReview({ ...review, [target.name]: value })
  }

  function handleRatingChange(value) {
    setReview({ ...review, rating: value })
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    if (!review.id) review.id = utilService.makeId()
    bookService
      .addReview(bookId, review)
      .then((updatedBook) => {
        setReview(bookService.getDefaultReview())
        onAddReview(updatedBook)
      })
      .catch((err) => {
        console.error('Failed to add review:', err.message)
      })
  }

  return (
    <section>
      <h3 className='review-headline'>Add a Review</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='fullname'>Name:</label>
        <input
          type='text'
          name='fullname'
          id='fullname'
          value={review.fullname}
          onChange={handleChange}
          required
        />
        <label className='rate-headline' htmlFor='rating'>
          Rating:
        </label>
        <div className='rating-method' onChange={(ev) => setRatingMethod(ev.target.value)}>
          <input type='radio' value='select' name='ratingMethod' defaultChecked /> Rate by Select
          <input type='radio' value='textbox' name='ratingMethod' /> Rate by Textbox
          <input type='radio' value='stars' name='ratingMethod' /> Rate by Stars
        </div>
        <RateMethod method={ratingMethod} val={review.rating} onSelected={handleRatingChange} />

        <label htmlFor='readAt'>Date Read:</label>
        <input
          type='date'
          name='readAt'
          id='readAt'
          value={review.readAt}
          onChange={handleChange}
          required
        />

        <button type='submit'>Add Review</button>
      </form>
    </section>
  )
}
