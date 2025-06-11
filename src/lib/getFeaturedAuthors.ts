import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getFeaturedAuthors(limit = 4) {
  const dir = path.join(process.cwd(), 'content', 'books')
  const bookSlugs = fs.readdirSync(dir)

  const authorCounts: Record<string, number> = {}

  for (const bookSlug of bookSlugs) {
    const chapterDir = path.join(dir, bookSlug)
    const files = fs.readdirSync(chapterDir)

    for (const file of files) {
      if (!file.endsWith('.md')) continue
      const filePath = path.join(chapterDir, file)
      const { data } = matter(fs.readFileSync(filePath, 'utf-8'))

      if (Array.isArray(data.authors)) {
        for (const name of data.authors) {
          authorCounts[name] = (authorCounts[name] || 0) + 1
        }
      }
    }
  }

  const sorted = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1]) // ordre décroissant
    .slice(0, limit)
    .map(([name]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }))

  return sorted
}
