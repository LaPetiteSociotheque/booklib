import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Header from "../../components/Header"
import { BookTitleBlock } from "../../components/BookTitleBlock"
import { BookChaptersTableOfContents } from "../../components/BookChaptersTableOfContents"
import { BookSidebarInfo } from "../../components/BookSidebarInfo"
import { getAllBooks, getBookBySlug } from "../../lib/books"
import BookSummary from "../../components/BookSummary"
import authors from '../../../data/authors.json'
import { Analytics } from "@vercel/analytics/next"



type Chapter = {
  title: string
  slug: string
  order: number
}

type Book = {
  slug: string
  title: string
  author: string
  publicationYear: number
  pageCount: number
  coverImage: string
  chapters: Chapter[]
}

type BookPageProps = {
  book: Book
  allBooks: Book[]
  summaryHtml: string
}

export default function BookPage({ book, allBooks, summaryHtml }: BookPageProps) {
  
  const authorEntry = authors.find((a) => a.name === book.author)
  const authorSlug = authorEntry?.slug
  
  return (
    <div className="min-h-screen bg-[#FAF4EB] text-[#2E2A26]">
      <Head>
        <title>{book.title}</title>
        <meta property="og:title" content="Sommaire | La Petite Sociothèque" />
  <meta property="og:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta property="og:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
  <meta property="og:url" content="https://lapetitesociotheque.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="La Petite Sociothèque"></meta>

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Sommaire | La Petite Sociothèque" />
  <meta name="twitter:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta name="twitter:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
      </Head>

      <Header />
      <div className="mt-8"></div>
      <main className="px-6 py-12 max-w-5xl mx-auto">
        <BookTitleBlock title={book.title} author={book.author} slug={authorSlug} />

        <div className="mt-10 flex flex-col lg:flex-row gap-10 items-start">
          {/* Résumé à gauche */}
          <div className="lg:w-2/3">
            <BookSummary summaryHtml={summaryHtml} />
          </div>

          {/* Fiche infos à droite */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-[#E8DCCA] p-4 rounded-2xl shadow-md">
              <BookSidebarInfo
                coverImage={book.coverImage}
                publicationYear={book.publicationYear}
                pageCount={book.pageCount}
              />
            </div>
          </div>
        </div>

        {/* Sommaire en dessous */}
        <div className="mt-12">
          <BookChaptersTableOfContents chapters={book.chapters} bookSlug={book.slug} />
        </div>
        <Analytics />
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await getAllBooks()
  const paths = books.map((book) => ({
    params: { bookSlug: book.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const book = await getBookBySlug(params?.bookSlug as string)
  const allBooks = await getAllBooks()

  const bookDir = path.join(process.cwd(), "content", "books", book.slug)

  // Exclure _summary.md des chapitres
  const chapterFiles = fs.readdirSync(bookDir)
    .filter(f => f.endsWith(".md") && !f.startsWith("_"))

  const chapters: Chapter[] = chapterFiles.map((filename) => {
    const filePath = path.join(bookDir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data } = matter(fileContent)
    return {
      slug: data.slug || filename.replace(/\.md$/, ""),
      title: data.title || "Chapitre sans titre",
      order: Number(data.order) || 99
    }
  }).sort((a, b) => a.order - b.order)

  // Lire le résumé du livre (_summary.md)
  const summaryPath = path.join(bookDir, "_summary.md")
  let summaryHtml = ""

  if (fs.existsSync(summaryPath)) {
    const fileContent = fs.readFileSync(summaryPath, "utf-8")
    const { content } = matter(fileContent)
    const processed = await remark().use(html).process(content)
    summaryHtml = processed.toString()
  }

  return {
    props: {
      book: {
        ...book,
        chapters
      },
      allBooks,
      summaryHtml
    }
  }
}
