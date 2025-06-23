import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import themes from '../../../data/themes.json'
import books from '../../../data/books.json'

export default function ThemesPage() {
  return (
    <>
      <Head>
        <title>Thèmes – La Petite Sociothèque</title>
        <meta property="og:title" content="Thèmes - La Petite Sociothèque" />
        <meta property="og:description" content="Fiches de lecture organisées par grands thèmes critiques en sciences sociales et histoire." />
        <meta property="og:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
        <meta property="og:url" content="https://lapetitesociotheque.com/themes" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="La Petite Sociothèque" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thèmes - La Petite Sociothèque" />
        <meta name="twitter:description" content="Fiches de lecture organisées par grands thèmes critiques en sciences sociales et histoire." />
        <meta name="twitter:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
      </Head>

      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] p-6">
        <Header />

        <div className="max-w-4xl mx-auto pt-10">
          <h1 className="text-2xl font-bold mb-6">Grands thèmes</h1>

          {themes.map((theme) => {
            const linkedBooks = theme.books
              .map((bookSlug) => books.find((b) => b.slug === bookSlug))
              .filter((b) => b !== undefined)

            return (
              <section key={theme.slug} className="mb-10">
                <h2 className="text-xl font-semibold">{theme.title}</h2>
                {theme.description && <p className="text-sm text-[#5E5A56] mb-2">{theme.description}</p>}

                <ul className="list-disc pl-5 space-y-1">
                  {linkedBooks.map((book) => (
                    <li key={book.slug}>
                      <Link href={`/books/${book.slug}`} className="text-[#B74E22] hover:underline">
                        {book.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </main>
    </>
  )
}
