import fs from "fs"
import path from "path"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Header from "../../components/Header"
import Link from "next/link"

type Concept = {
  title: string
  slug: string
  definition: string
  historicalContext: string
  books: string[]
}

type BookRef = {
  slug: string
  title: string
}

type Props = {
  concept: Concept
  bookTitles: BookRef[]
}

export default function ConceptPage({ concept, bookTitles }: Props) {
  const renderParagraphs = (text: string) => {
    return text
      .trim()
      .split(/\n\s*\n/) // Découpe par paragraphes (double saut de ligne ou lignes vides)
      .map((para, i) => (
        <p key={i}>
          {para.split('\n').map((line, j) => (
            <span key={j}>
              {line}
              {j < para.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      ))
  }

  return (
    <>
      <Head>
        <title>{`${concept.title} – Concept | La Petite Sociothèque`}</title>
        <meta property="og:title" content="Concept | La Petite Sociothèque`}" />
  <meta property="og:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta property="og:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
  <meta property="og:url" content="https://lapetitesociotheque.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="La Petite Sociothèque"></meta>

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Concept | La Petite Sociothèque`}" />
  <meta name="twitter:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta name="twitter:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
      </Head>

      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] p-6">
        <Header />
        <div className="mt-8"></div>
        <div className="max-w-3xl mx-auto">
          <Link href="/concepts" className="text-[#B74E22] underline">
            ← Retour à la liste des concepts
          </Link>

          <h1 className="text-4xl font-bold text-[#B74E22] mt-6 mb-4">{concept.title}</h1>

          <div className="bg-[#f4e9dd] border border-[#e0d4c4] p-6 rounded-xl space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#B74E22] mb-2">Définition</h2>
              <div className="prose prose-neutral dark:prose-invert space-y-4">
                {renderParagraphs(concept.definition)}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#B74E22] mb-2">Contexte historique</h2>
              <div className="prose prose-neutral dark:prose-invert space-y-4">
                {renderParagraphs(concept.historicalContext)}
              </div>
            </section>
          </div>

          {bookTitles.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-[#B74E22] mb-2">Présent dans :</h2>
              <ul className="list-disc list-inside space-y-1">
                {bookTitles.map((book) => (
                  <li key={book.slug}>
                    <Link href={`/books/${book.slug}`} className="text-[#B74E22] underline">
                      {book.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data", "concepts.json")
  const raw = fs.readFileSync(filePath, "utf8")
  const concepts: Concept[] = JSON.parse(raw)

  const paths = concepts.map((concept) => ({
    params: { slug: concept.slug }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  const conceptsPath = path.join(process.cwd(), "data", "concepts.json")
  const booksPath = path.join(process.cwd(), "data", "books.json")

  const concepts: Concept[] = JSON.parse(fs.readFileSync(conceptsPath, "utf8"))
  const books: BookRef[] = JSON.parse(fs.readFileSync(booksPath, "utf8"))

  const concept = concepts.find((c) => c.slug === slug)
  if (!concept) return { notFound: true }

  const bookTitles = concept.books.map((slug) => {
    const book = books.find((b) => b.slug === slug)
    return {
      slug,
      title: book?.title || slug
    }
  })

  return {
    props: {
      concept,
      bookTitles
    }
  }
}
