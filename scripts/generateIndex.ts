import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'


type IndexEntry = {
  bookSlug: string
  chapterSlug: string
  title: string
}

const contentDir = path.join(process.cwd(), 'content', 'books')
const authorsIndex: Record<string, IndexEntry[]> = {}
const conceptsIndex: Record<string, IndexEntry[]> = {}

const bookSlugs = fs.readdirSync(contentDir)

for (const bookSlug of bookSlugs) {
  const bookPath = path.join(contentDir, bookSlug)
  const chapterFiles = fs.readdirSync(bookPath)

  for (const filename of chapterFiles) {
    if (!filename.endsWith('.md')) continue

    const chapterSlug = filename.replace(/\.md$/, '')
    const fullPath = path.join(bookPath, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const { data } = matter(fileContents)

    const entry: IndexEntry = {
      bookSlug,
      chapterSlug,
      title: data.title || chapterSlug,
    }

    // Indexation des auteurs
    const authors: string[] = data.authors || []
    authors.forEach((author) => {
      if (!authorsIndex[author]) authorsIndex[author] = []
      authorsIndex[author].push(entry)
    })

    // Indexation des concepts
    const concepts: string[] = data.concepts || []
    concepts.forEach((concept) => {
      if (!conceptsIndex[concept]) conceptsIndex[concept] = []
      conceptsIndex[concept].push(entry)
    })
  }
}

// Création du dossier data s'il n'existe pas
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)

// Sauvegarde des fichiers JSON
fs.writeFileSync(
  path.join(dataDir, 'authors.json'),
  JSON.stringify(authorsIndex, null, 2),
  'utf-8'
)

fs.writeFileSync(
  path.join(dataDir, 'concepts.json'),
  JSON.stringify(conceptsIndex, null, 2),
  'utf-8'
)

console.log('✅ Index des auteurs et concepts généré avec succès.')
