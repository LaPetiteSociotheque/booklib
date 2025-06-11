const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const booksDir = path.join(process.cwd(), "content", "books");
const bookSlugs = fs.readdirSync(booksDir);

const books = bookSlugs.map((bookSlug) => {
  const bookPath = path.join(booksDir, bookSlug);

  // 📄 Récupérer tous les chapitres (fichiers .md)
  const chapterFiles = fs
    .readdirSync(bookPath)
    .filter((f) => f.endsWith(".md"));

  if (chapterFiles.length === 0) {
    console.warn(`⚠️ Aucun chapitre trouvé dans ${bookSlug}`);
    return {
      slug: bookSlug,
      title: bookSlug,
      author: "Auteur inconnu",
      chapters: [],
    };
  }

  let bookTitle = null;
  let author = null;
  let publicationYear = null;
  let pageCount = null;
  let coverImage = `/images/covers/${bookSlug}.jpg`;

  const chapters = chapterFiles
    .map((filename) => {
      const filePath = path.join(bookPath, filename);
      const { data } = matter(fs.readFileSync(filePath, "utf-8"));

      // 🔁 Récupérer les métadonnées globales dès qu'on les trouve
      if (!bookTitle && data.bookTitle) bookTitle = data.bookTitle;
      if (!author && data.author) author = data.author;
      if (!publicationYear && data.publicationYear)
        publicationYear = data.publicationYear;
      if (!pageCount && data.pageCount) pageCount = data.pageCount;
      if (!coverImage && data.coverImage) coverImage = data.coverImage;

      return {
        title: data.title || filename.replace(".md", ""),
        slug: filename.replace(".md", ""),
        order: data.order || 0,
      };
    })
    .sort((a, b) => a.order - b.order);

  return {
    slug: bookSlug,
    title: bookTitle || bookSlug,
    author: author || "Auteur inconnu",
    publicationYear: publicationYear || null,
    pageCount: pageCount || null,
    coverImage: coverImage,
    chapters,
  };
});

const outputFile = path.join(process.cwd(), "data", "books.json");
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(books, null, 2));
console.log("✅ books.json généré avec succès dans /data");
