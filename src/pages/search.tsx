import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Header from '../../src/components/Header'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

type Chapter = {
  title: string
  slug: string
  bookSlug: string
}

type Book = {
  title: string
  slug: string
  description?: string
}

type Props = {
  q: string
  books: Book[]
  chapters: Chapter[]
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const q = (query.q as string || '').toLowerCase()

  const booksDir = path.join(process.cwd(), 'content', 'books')
  if (!fs.existsSync(booksDir)) {
    return { props: { q, books: [], chapters: [] } }
  }

  const bookSlugs = fs.readdirSync(booksDir)
  const books: Book[] = []
  const chapters: Chapter[] = []

  for (const bookSlug of bookSlugs) {
    const chapterDir = path.join(booksDir, bookSlug)
    if (!fs.statSync(chapterDir).isDirectory()) continue

    const chapterFiles = fs.readdirSync(chapterDir).filter(f => f.endsWith('.md'))

    let bookMatched = false

    for (const file of chapterFiles) {
      const filePath = path.join(chapterDir, file)

      try {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        const chapterSlug = file.replace(/\.md$/, '')
        const chapterTitle = typeof data.title === 'string' ? data.title : chapterSlug

        const bookTitle = typeof data.bookTitle === 'string' ? data.bookTitle : ''
        const description = typeof data.description === 'string' ? data.description : ''

        const textMatch = chapterTitle.toLowerCase().includes(q) || content.toLowerCase().includes(q)
        const bookMatch = bookTitle.toLowerCase().includes(q) || description.toLowerCase().includes(q)

        if (textMatch) {
          chapters.push({
            title: chapterTitle,
            slug: chapterSlug,
            bookSlug,
          })
        }

        if (!bookMatched && (bookMatch || textMatch)) {
          books.push({
            slug: bookSlug,
            title: bookTitle || chapterTitle,
            description,
          })
          bookMatched = true
        }
      } catch (error) {
        console.error(`Erreur lors du traitement de ${filePath}`, error)
        continue
      }
    }
  }

  return {
    props: {
      q,
      books,
      chapters,
    },
  }
}

export default function SearchPage({ q, books, chapters }: Props) {
  return (
    <>
      <Head>
        <title>Résultats de recherche – La Petite Sociothèque</title>
      </Head>
      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Résultats de recherche pour : “{q}”</h1>

        {books.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Livres</h2>
            <ul className="space-y-2">
              {books.map((book, i) => (
                <li key={i}>
                  <Link href={`/books/${book.slug}`} className="underline text-[#B74E22]">
                    {book.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {chapters.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Chapitres</h2>
            <ul className="space-y-2">
              {chapters.map((chapter, i) => (
                <li key={i}>
                  <Link href={`/books/${chapter.bookSlug}/${chapter.slug}`} className="underline text-[#B74E22]">
                    {chapter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {books.length === 0 && chapters.length === 0 && (
          <p>Aucun résultat trouvé.</p>
        )}
      </main>
    </>
  )
}
