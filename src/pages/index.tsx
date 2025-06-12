import fs from "fs"
import path from "path"
import Link from "next/link"
import Head from "next/head"
import Header from "../components/Header"
import RecommendedBooks from "../components/RecommendedBooks"
import authorsIndex from "../../data/authors.json"

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/books.json")
  const fileContents = fs.readFileSync(filePath, "utf-8")
  const books = JSON.parse(fileContents)

  // Génération d'un hash basé sur la date (ex : "2025-06-12")
  const today = new Date()
  const daySeed = today.toISOString().split("T")[0]
  const hash = daySeed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Fiches de lecture en vedette (2 livres)
  const featuredBookStart = hash % Math.max(books.length - 1, 1)
  const featuredBooks = books.slice(featuredBookStart, featuredBookStart + 2)

  // Derniers livres
  const latestBooks = books.slice(-2)

  // Auteurs en vedette (3 auteurs)
  const featuredAuthorStart = hash % Math.max(authorsIndex.length - 2, 1)
  const featuredAuthors = authorsIndex.slice(featuredAuthorStart, featuredAuthorStart + 3)

  return {
    props: {
      books,
      featuredBooks,
      latestBooks,
      featuredAuthors,
    },
    revalidate: 86400, // revalider tous les jours
  }
}

export default function HomePage({ books, featuredBooks, latestBooks, featuredAuthors }) {
  return (
    <>
      <Head>
        <title>La Petite Sociothèque</title>
      </Head>

      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] px-6">
        <Header />

        <div className="max-w-5xl mx-auto pt-10">

          {/* Fiches de lecture en vedette */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#B74E22] mb-6">Fiches de lecture en vedette</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredBooks.map((book) => (
                <Link key={book.slug} href={`/books/${book.slug}`}>
                  <div className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition cursor-pointer h-full flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                    <p className="text-sm text-[#4A3F38] overflow-hidden max-h-24">{book.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Dernières fiches publiées */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#B74E22] mb-6">Dernières fiches publiées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestBooks.map((book) => (
                <Link key={book.slug} href={`/books/${book.slug}`}>
                  <div className="bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition cursor-pointer h-full flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                    <p className="text-sm text-[#4A3F38] overflow-hidden max-h-24">{book.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Auteurs en vedette */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#B74E22] mb-6">Auteurs en vedette</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAuthors.map((author) => (
                <Link key={author.slug} href={`/authors/${author.slug}`}>
                  <div className="bg-white shadow-md p-4 rounded-2xl hover:shadow-lg transition cursor-pointer flex items-center gap-4">
                    <img
                      src={`/images/authors/${author.slug}.jpg`}
                      alt={author.name}
                      className="w-16 h-16 object-cover rounded-full border border-[#E8DCCA]"
                    />
                    <span className="text-base font-medium">{author.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Bande ouvrages recommandés */}
          <RecommendedBooks books={books} />

        </div>
      </main>
    </>
  )
}
