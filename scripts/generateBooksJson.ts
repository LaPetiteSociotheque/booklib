// scripts/generateBooksJson.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const booksDir = path.join(process.cwd(), 'content', 'books')
const outputPath = path.join(process.cwd(), 'data', 'books.json')

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.md$/, '')
}

function getAllBooks() {
  const bookSlugs = fs.readdirSync(booksDir)

  const books = bookSlugs.map((bookSlug) => {
    const bookPath = path.join(booksDir, bookSlug)
    const files = fs.readdirSync(bookPath).filter((f) => f.endsWith('.md'))

    const chapters = files.map((file) => {
      const fullPath = path.join(bookPath, file)
      const fileContent = fs.readFileSync(fullPath, 'utf-8')
      const { data } = matter(fileContent)

      return {
        title: data.title || getSlugFromFilename(file),
        slug: getSlugFromFilename(file),
        order: data.order || 0
      }
    }).sort((a, b) => a.order - b.order)

    // Informations statiques à adapter pour chaque livre
    return {
      slug: bookSlug,
      title: 'À compléter',
      author: 'À compléter',
      publicationYear: 0,
      pageCount: 0,
      coverImage: `/images/covers/${bookSlug}.jpg`,
      chapters
    }
  })

  return books
}

function generateBooksJson() {
  const books = getAllBooks()
  fs.writeFileSync(outputPath, JSON.stringify(books, null, 2))
  console.log(`✅ Fichier books.json généré avec ${books.length} livres.`)
}

generateBooksJson()
