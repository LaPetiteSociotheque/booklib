import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Header from "../../../components/Header"
import Link from "next/link"
import ThemesSection from "../../../components/chapters/ThemesSection"
import SummarySection from "../../../components/chapters/SummarySection"
import ConceptsSection from "../../../components/chapters/ConceptsSection"
import RecommendedBooks from "../../../components/RecommendedBooks"
import books from "../../../../data/books.json"

type Props = {
  title: string
  contentHtml: string
  bookSlug: string
  previousChapter?: { slug: string }
  nextChapter?: { slug: string }
}

export default function ChapterPage({ title, contentHtml, bookSlug, previousChapter, nextChapter }: Props) {
  function extractSection(html: string, key: string): string {
    const pattern = new RegExp(`<!--${key}:start-->([\\s\\S]*?)<!--${key}:end-->`, "i")
    const match = html.match(pattern)
    return match ? match[1].trim() : ""
  }

  const themesHtml = extractSection(contentHtml, "themes")
  const summaryHtml = extractSection(contentHtml, "summary")
  const conceptsHtml = extractSection(contentHtml, "concepts")

  return (
    <>
      <Head>
        <title>{`${title} | La Petite Sociothèque`}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content="La Petite Sociothèque" />
  <meta property="og:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta property="og:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
  <meta property="og:url" content="https://lapetitesociotheque.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="La Petite Sociothèque"></meta>

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="La Petite Sociothèque" />
  <meta name="twitter:description" content="Fiches de lecture accessibles et engagées en sciences sociales et histoire critique." />
  <meta name="twitter:image" content="https://lapetitesociotheque.com/images/og/homepage.jpg" />
      </Head>
      <div className="mt-8"></div>
      <main className="min-h-screen bg-[#FAF4EB] text-[#2E2A26] p-6">
        <Header />

        <div className="max-w-3xl mx-auto mb-6">
          <Link href={`/books/${bookSlug}`} className="text-[#B74E22] underline">
            ← Retour au sommaire du livre
          </Link>
        </div>

        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#B74E22] mb-6">{title}</h1>
          <ThemesSection html={themesHtml} />
          <SummarySection html={summaryHtml} />
          <ConceptsSection html={conceptsHtml} />
        </article>

        <nav className="max-w-3xl mx-auto mt-16 flex justify-between text-[#B74E22] underline text-sm">
          {previousChapter ? (
            <Link href={`/books/${bookSlug}/${previousChapter.slug}`}>
              ← Chapitre Précédent
            </Link>
          ) : <span />}

          {nextChapter ? (
            <Link href={`/books/${bookSlug}/${nextChapter.slug}`}>
              Chapitre Suivant →
            </Link>
          ) : <span />}
        </nav>

        
      </main>
    </>
  )
}

function linkConceptsInHtml(html: string, concepts: { title: string; slug: string }[]): string {
  concepts.forEach(({ title, slug }) => {
    const pattern = new RegExp(`\\b(${title})\\b`, "gi")
    html = html.replace(pattern, `<a href="/concepts/${slug}" class="text-[#B74E22] underline">$1</a>`)
  })
  return html
}

export const getStaticPaths: GetStaticPaths = async () => {
  const booksPath = path.join(process.cwd(), "content", "books")
  const bookSlugs = fs.readdirSync(booksPath)

  const paths = bookSlugs.flatMap((bookSlug) => {
    const chaptersDir = path.join(booksPath, bookSlug)
    const chapterFiles = fs.readdirSync(chaptersDir).filter(f => f.endsWith(".md"))

    return chapterFiles.map((filename) => {
      const fileContent = fs.readFileSync(path.join(chaptersDir, filename), "utf-8")
      const { data } = matter(fileContent)

      return {
        params: {
          bookSlug,
          chapterSlug: data.slug || filename.replace(/\.md$/, "")
        }
      }
    })
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bookSlug = params?.bookSlug as string
  const chapterSlug = params?.chapterSlug as string

  const bookDir = path.join(process.cwd(), "content", "books", bookSlug)
  const chapterFiles = fs.readdirSync(bookDir).filter(f => f.endsWith(".md"))

  const chapters = chapterFiles.map((filename) => {
    const fileContent = fs.readFileSync(path.join(bookDir, filename), "utf-8")
    const { data } = matter(fileContent)
    return {
      slug: data.slug || filename.replace(/\.md$/, ""),
      title: data.title || "Chapitre sans titre",
      order: Number(data.order) || 99,
      fileName: filename
    }
  }).sort((a, b) => a.order - b.order)

  const currentIndex = chapters.findIndex((c) => c.slug === chapterSlug)
  if (currentIndex === -1) return { notFound: true }

  const currentFile = chapters[currentIndex].fileName
  const fileContent = fs.readFileSync(path.join(bookDir, currentFile), "utf-8")
  const { data, content } = matter(fileContent)

  // Fonction pour convertir Markdown en HTML
  async function markdownToHtml(markdown: string): Promise<string> {
    const processed = await remark().use(html).process(markdown)
    return processed.toString()
  }

  // Extraction des blocs par balises
  function extractBlock(text: string, key: string): string {
    const pattern = new RegExp(`<!--${key}:start-->([\\s\\S]*?)<!--${key}:end-->`, "i")
    const match = text.match(pattern)
    return match ? match[1].trim() : ""
  }

  const themesMarkdown = extractBlock(content, "themes")
  const summaryMarkdown = extractBlock(content, "summary")
  const conceptsMarkdown = extractBlock(content, "concepts")

  const [themesHtml, summaryHtml, conceptsRawHtml] = await Promise.all([
    markdownToHtml(themesMarkdown),
    markdownToHtml(summaryMarkdown),
    markdownToHtml(conceptsMarkdown)
  ])

  let contentHtml = `
<!--themes:start-->${themesHtml}<!--themes:end-->
<!--summary:start-->${summaryHtml}<!--summary:end-->
<!--concepts:start-->${conceptsRawHtml}<!--concepts:end-->
`

  const conceptsPath = path.join(process.cwd(), "data", "concepts.json")
  const concepts = JSON.parse(fs.readFileSync(conceptsPath, "utf-8"))

  const conceptPattern = /<!--concepts:start-->([\s\S]*?)<!--concepts:end-->/i
  contentHtml = contentHtml.replace(conceptPattern, (match, inner) => {
    const linked = linkConceptsInHtml(inner, concepts)
    return `<!--concepts:start-->${linked}<!--concepts:end-->`
  })

  return {
    props: {
      title: data.title || "Chapitre sans titre",
      contentHtml,
      bookSlug,
      previousChapter: chapters[currentIndex - 1] ?? null,
      nextChapter: chapters[currentIndex + 1] ?? null
    }
  }
}
