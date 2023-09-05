const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { Loader } from '../cmps/loader.jsx'
import { LongTxt } from '../cmps/long-txt.jsx'
import { Reviewes } from '../cmps/Reviewes.jsx'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

export function BookDetails({ books }) {
  const [book, setBook] = useState(null)
  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [bookId])

  const date = new Date().getFullYear()

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => {
        setBook(book)
        // console.log('Loaded Book:', book)
      })
      .catch((err) => {
        console.log('Had issue with:', err)
        onGoBack()
      })
  }

  function onAddReview(newReview) {
    setBook((prevBook) => {
      return {
        ...prevBook,
        reviews: [...prevBook.reviews, newReview],
      }
    })
    showSuccessMsg('Review Added!')
  }

  function handleRemoveReview(reviewId) {
    bookService
      .removeReview(bookId, reviewId)
      .then((updatedBook) => {
        setBook(updatedBook)
        showSuccessMsg('Review Removed!')
      })
      .catch((err) => console.error('Failed to remove review', err))
  }

  function onGoBack() {
    navigate('/book')
  }

  function getBookPrice() {
    if (book.listPrice.amount > 150) return 'red'
    else if (book.listPrice.amount < 20) return 'green'

    return ''
  }

  function getPageCount() {
    const { pageCount } = book
    let pageCountStr = ''

    if (pageCount > 500) pageCountStr = pageCount + ' - Serious Reading'
    else if (pageCount <= 500 && pageCount > 200) pageCountStr = pageCount + ' - Descent Reading'
    else if (pageCount < 100) pageCountStr = pageCount + ' - Light Reading'
    else pageCountStr = pageCount

    return pageCountStr
  }

  function getBookPublishedYear() {
    const { publishedDate } = book
    let publishedDateStr = ''

    if (date - publishedDate > 10) publishedDateStr = publishedDate + ' - Vintage'
    else if (date - publishedDate <= 1) publishedDateStr = publishedDate + ' - New'
    else publishedDateStr = publishedDate

    return publishedDateStr
  }

  if (!book) return <Loader />

  return (
    <section className='book-details'>
      <h2>{book.title}</h2>
      <h3>{book.subtitle}</h3>
      <h3 className={`${getBookPrice()}`}>
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </h3>

      <h4>Authors: {book.authors.map((category) => category).join(', ')}</h4>
      <h4>Categories: {book.categories.map((category) => category).join(', ')}</h4>
      <h4>Pages Count: {getPageCount()}</h4>
      <h4>Language: {book.language}</h4>
      <h4>Published At: {getBookPublishedYear()}</h4>

      {book.listPrice.isOnSale && <h2 className='sale'>On Sale! </h2>}
      <div className='book-navigation'>
        <span>
          {book.prevBookId && <Link to={`/book/${book.prevBookId}`}>&laquo; Previous</Link>}
        </span>
        <span>{book.nextBookId && <Link to={`/book/${book.nextBookId}`}>Next &raquo;</Link>}</span>
      </div>

      <img src={book.thumbnail} alt={`${book.title}`} />
      <LongTxt txt={book.description} length={100} />

      <Reviewes bookId={book.id} onAddReview={onAddReview} />
      <table className='reviews-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {book.reviews && book.reviews.length ? (
            book.reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.fullname}</td>
                <td>{review.rating}</td>
                <td>{review.readAt}</td>
                <td>
                  <button onClick={() => handleRemoveReview(review.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='4'>No reviews for this book</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className='btns-bottom' onClick={onGoBack}>
        Go Back
      </button>
      <button className='btns-bottom'>
        <Link to={`/book/edit/${book.id}`}>Edit</Link>
      </button>
    </section>
  )
}
