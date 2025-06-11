import books from '../../data/books.json'

export function getAllBooks() {
  return books
}

export function getBookBySlug(slug: string) {
  return books.find(book => book.slug === slug)
}
