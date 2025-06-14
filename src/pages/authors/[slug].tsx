// pages/authors/[slug].tsx

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Header from '../../components/Header'
import AuthorHeader from '../../components/AuthorHeader'
import AuthorBiography from '../../components/AuthorBiography'
import AuthorWorks from '../../components/AuthorWorks'
import { GetStaticPaths, GetStaticProps } from 'next'

type Props = {
  name: string
  slug: string
  content: string
  books: { title: string; slug: string }[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), 'content', 'authors')
  const filenames = fs.readdirSync(dir)

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  // Chargement de la fiche auteur
  const filePath = path.join(process.cwd(), 'content', 'authors', `${slug}.md`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  // Recherche des livres associés dans content/[book]/[chapter].md
  const contentRoot = path.join(process.cwd(), 'content', 'books')
  const allDirs = fs.readdirSync(contentRoot)
  const books: { title: string; slug: string }[] = []

  for (const dir of allDirs) {
    const dirPath = path.join(contentRoot, dir)
    const chapterFiles = fs.readdirSync(dirPath).filter((f) => f.toLowerCase().endsWith('.md'))

    for (const file of chapterFiles) {
      const chapterContent = fs.readFileSync(path.join(dirPath, file), 'utf8')
      const { data: chapterData } = matter(chapterContent)

      // LOGS pour debug
      console.log("→ Fichier analysé :", file)
      console.log("  ↳ author:", chapterData.author)
      console.log("  ↳ book:", chapterData.book)
      console.log("  ↳ bookSlug:", chapterData.bookSlug)

      if (chapterData.author && chapterData.book && chapterData.bookSlug) {
        const authorSlug = chapterData.author.toLowerCase().replace(/\s+/g, '-')

        if (authorSlug === slug) {
          books.push({
            title: chapterData.book,
            slug: chapterData.bookSlug
          })
          break // un seul chapitre suffit
        }
      }
    }
  }

  return {
    props: {
      name: data.name || slug,
      slug,
      content,
      books
    }
  }
}

export default function AuthorPage({ name, slug, content, books }: Props) {
  return (
    <>
      <Head>
        <title>{`${name} – La Petite Sociothèque`}</title>
        <meta property="og:title" content="{`${name} | La Petite Sociothèque`}" />
  <meta property="og:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta property="og:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
  <meta property="og:url" content="https://lapetitesociotheque.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="La Petite Sociothèque"></meta>

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{`${name} | La Petite Sociothèque`}" />
  <meta name="twitter:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta name="twitter:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
      </Head>
      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] p-6">
        <Header />
        <div className="mt-8"></div>
        <AuthorHeader name={name} slug={slug} />
        <AuthorBiography content={content} />
        <AuthorWorks books={books} />
      </main>
    </>
  )
}
