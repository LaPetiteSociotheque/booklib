import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Header from '../../components/Header'
import AuthorCard from '../../components/AuthorCard'
import Link from 'next/link'
import { GetStaticProps } from 'next'

type Author = {
  name: string
  slug: string
}

type Props = {
  authors: Author[]
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'authors.json')
  const raw = fs.readFileSync(filePath, 'utf8')
  const authors: Author[] = JSON.parse(raw)

  // Tri alphabétique par nom
  const sortedAuthors = authors.sort((a, b) => a.name.localeCompare(b.name))

  return {
    props: {
      authors: sortedAuthors,
    },
  }
}

export default function AuthorListPage({ authors }: Props) {
  return (
    <>
      <Head>
        <title>Tous les auteurs – La Petite Sociothèque</title>
        <meta name="description" content="Liste complète des auteurs de la Petite Sociothèque" />
        <meta property="og:title" content="Auteur·ices | La Petite Sociothèque" />
  <meta property="og:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta property="og:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
  <meta property="og:url" content="https://lapetitesociotheque.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="La Petite Sociothèque"></meta>

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Auteur·ices | La Petite Sociothèque" />
  <meta name="twitter:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta name="twitter:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
      </Head>

      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Tous les auteurs</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {authors.map((author) => (
            <Link href={`/authors/${author.slug}`} key={author.slug}>
              <AuthorCard name={author.name} />
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
