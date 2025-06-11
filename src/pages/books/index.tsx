import fs from "fs"
import path from "path"
import Head from "next/head"
import Link from "next/link"
import Header from "../../components/Header"

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/books.json")
  const fileContents = fs.readFileSync(filePath, "utf-8")
  const books = JSON.parse(fileContents)

  // Tri alphabétique
  const booksSorted = books.sort((a, b) => a.title.localeCompare(b.title))

  return { props: { books: booksSorted } }
}

export default function BooksPage({ books }) {
  return (
    <>
      <Head>
        <title>Fiches par ordre alphabétique – La Petite Sociothèque</title>
      </Head>

      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] px-6">
        <Header />

        <div className="max-w-4xl mx-auto pt-10">
          <h1 className="text-2xl font-bold text-[#B74E22] mb-6">Toutes les fiches par ordre alphabétique</h1>

          <ul className="space-y-4">
            {books.map((book) => (
              <li key={book.slug}>
                <Link href={`/books/${book.slug}`} className="text-lg hover:underline text-[#2E2A26]">
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
