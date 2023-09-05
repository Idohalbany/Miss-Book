const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/home.jsx'
import { BookIndex } from './pages/book-index.jsx'
import { BookEdit } from './pages/book-edit.jsx'
import { BookDetails } from './pages/book-details.jsx'
import { About } from './pages/about.jsx'
import { BookAdd } from './pages/BookAdd.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

export function App() {
  return (
    <Router>
      <section className='app main-layout'>
        <header className='app-header full main-layout'>
          <AppHeader />
        </header>

        <main>
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<BookIndex />} path='/book' />
            <Route element={<BookEdit />} path='/book/edit' />
            <Route element={<BookEdit />} path='/book/edit/:bookId' />
            <Route element={<BookDetails />} path='/book/:bookId' />
            <Route element={<About />} path='/about' />
            <Route element={<BookAdd />} path='/BookAdd' />
          </Routes>
        </main>

        <UserMsg />
      </section>
    </Router>
  )
}
