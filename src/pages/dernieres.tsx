// pages/dernieres.tsx
import fs from "fs"
import path from "path"
import Head from "next/head"
import Link from "next/link"
import Header from "../components/Header"
import { Analytics } from "@vercel/analytics/next"

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/books.json")
  const fileContents = fs.readFileSync(filePath, "utf-8")
  const books = JSON.parse(fileContents)

  const sortedBooks = [...books].sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });

  return {
    props: { sortedBooks },
    revalidate: 86400,
  }
}

export default function DernieresPage({ sortedBooks }) {
  return (
    <>
      <Head>
        <title>Dernières fiches publiées – La Petite Sociothèque</title>
         <meta property="og:title" content="Dernières Fiches Publiées - La Petite Sociothèque" />
  <meta property="og:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta property="og:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
  <meta property="og:url" content="https://lapetitesociotheque.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="La Petite Sociothèque"></meta>

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Dernières Fiches Publiées - La Petite Sociothèque" />
  <meta name="twitter:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta name="twitter:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
      </Head>

      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] px-6">
        <Header />
        <div className="max-w-4xl mx-auto pt-10">
          <h1 className="text-2xl font-bold text-[#B74E22] mb-8">Dernières fiches publiées</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedBooks.map((book) => (
              <Link key={book.slug} href={`/books/${book.slug}`}>
                <div className="bg-white shadow-md p-4 rounded-2xl hover:shadow-lg transition cursor-pointer h-full flex gap-4 items-start">
                  <img
                    src={`/images/covers/${book.slug}.jpg`}
                    alt={`Couverture de ${book.title}`}
                    className="w-20 h-28 object-cover rounded-lg border border-[#E8DCCA] flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                    <p className="text-sm text-[#4A3F38] mb-2">{book.description}</p>
                    <span className="text-xs text-[#A78B71]">{book.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Analytics />
      </main>
    </>
  )
}
