import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { marked } from 'marked'


const contentDir = path.join(process.cwd(), 'content')

type Chapter = {
  title: string
  slug: string
  bookSlug: string
  content: string
  
}

export async function getMarkdownContent(folder: string) {
  const dir = path.join(process.cwd(), 'content', folder)
  const files = fs.readdirSync(dir)

  const bookSlug = path.basename(folder) 

  const chapters = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      ...data,
      content: marked(content),
      slug: filename.replace('.md', ''),
      bookSlug: bookSlug, // <-- ajoute automatiquement
    }
  })

  return chapters
}

