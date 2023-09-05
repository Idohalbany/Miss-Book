const { useNavigate } = ReactRouterDOM
const { useState } = React
import { bookService } from '../services/book.service.js'
import { googleBookService } from '../services/googleBook.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

export function BookAdd() {
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState([])
  const navigate = useNavigate()

  const debouncedHandleSearch = debounce(() => {
    googleBookService.query(searchTerm).then((bookFromApi) => {
      setBooks(bookFromApi)
    })
  }, 500)
  
  function onInputChange(ev) {
    setSearchTerm(ev.target.value)
    debouncedHandleSearch()
  }

  function onAddBookFromGoogle(book) {
    bookService.addGoogleBook(book)
    showSuccessMsg('Book Added !')
    setSearchTerm('')
    setBooks([])
  }

  function onGoBack() {
    navigate('/book')
  }

  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  return (
    <section className='book-add'>
      <div className='add-books-form'>
        <h2>Search and Add Books</h2>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <input type='text' value={searchTerm} onChange={onInputChange} />
          <button type='submit'>Search</button>
          <button onClick={onGoBack}>See All Books</button>
        </form>
      </div>
      <div className='google-books-display'>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title}
              <button onClick={() => onAddBookFromGoogle(book)}>+</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
