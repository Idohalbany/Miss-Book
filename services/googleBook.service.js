const GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes?q='

export const googleBookService = {
  query,
}

function query(txt) {
  return fetch(GOOGLE_API + txt)
    .then((response) => response.json())
    .then((data) => {
      return data.items.map((book) => _convertGoogleBook(book))
    })
}

function _convertGoogleBook(googleBook) {
  return {
    id: googleBook.id,
    title: googleBook.volumeInfo.title,
    subtitle: googleBook.volumeInfo.subtitle || '',
    authors: googleBook.volumeInfo.authors || [],
    publishedDate: googleBook.volumeInfo.publishedDate,
    description: googleBook.volumeInfo.description || '',
    pageCount: googleBook.volumeInfo.pageCount,
    categories: googleBook.volumeInfo.categories || [],
    thumbnail:
      googleBook.volumeInfo.imageLinks && googleBook.volumeInfo.imageLinks.thumbnail
        ? googleBook.volumeInfo.imageLinks.thumbnail
        : '',
    language: googleBook.volumeInfo.language,
    listPrice: _getGoogleBookPrice(googleBook.saleInfo),
    reviews: [],
  }
}

function _getGoogleBookPrice(saleInfo) {
  const defaultPrice = {
    amount: 'Not for sale',
    currencyCode: '',
    isOnSale: false,
  }

  if (!saleInfo || !saleInfo.listPrice) return defaultPrice

  return {
    amount: saleInfo.listPrice.amount,
    currencyCode: saleInfo.listPrice.currencyCode,
    isOnSale: saleInfo.saleability === 'FOR_SALE',
  }
}
