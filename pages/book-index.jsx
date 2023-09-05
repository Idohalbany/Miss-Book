import { BookDetails } from './book-details.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { Loader } from '../cmps/loader.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookEdit } from './book-edit.jsx'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy, books])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((booksToUpdate) => setBooks(booksToUpdate))
      .catch((error) => console.error('Error loading books:', error))
  }

  function onSetFilter(filterByFromFilter) {
    setFilterBy(filterByFromFilter)
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId).then(() => {
      showSuccessMsg('Removed')
    })
  }

  function onSelectBook(bookId) {
    bookService.get(bookId).then((book) => {
      setSelectedBook(book)
    })
  }

  if (!books) return <Loader />

  return (
    <section className='book-index '>
      {!selectedBook && (
        <div>
          <BookFilter onSetFilter={onSetFilter} />
          <BookEdit />
          <BookList books={books} onRemoveBook={onRemoveBook} onSelectBook={onSelectBook} />
        </div>
      )}

      {selectedBook && <BookDetails books={books} />}
    </section>
  )
}
