const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const booksDir = path.join(process.cwd(), "content", "books");
const bookSlugs = fs.readdirSync(booksDir);

const books = bookSlugs.map((bookSlug) => {
  const bookPath = path.join(booksDir, bookSlug);

  // Vérifie que le dossier contient des fichiers Markdown
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
  let description = "";

  // Cherche un fichier _summary.md
  const summaryPath = path.join(bookPath, "_summary.md");
  if (fs.existsSync(summaryPath)) {
    const rawContent = fs.readFileSync(summaryPath, "utf-8");
    const { data: summaryData, content: summaryBody } = matter(rawContent);

    // Mise à jour prioritaire depuis _summary.md si info présente
    if (summaryData.title) bookTitle = summaryData.title;
    if (summaryData.author) author = summaryData.author;
    if (summaryData.publicationYear) publicationYear = summaryData.publicationYear;
    if (summaryData.pageCount) pageCount = summaryData.pageCount;

    // Extraire le premier paragraphe non vide
    description = summaryBody
      .split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .find((p) => p.length > 0)
      ?.replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1") || "";
  }

  // Récupérer tous les chapitres
  const chapters = chapterFiles
    .filter((f) => f !== "_summary.md") // Ne pas inclure le résumé comme chapitre
    .map((filename) => {
      const filePath = path.join(bookPath, filename);
      const { data } = matter(fs.readFileSync(filePath, "utf-8"));

      // Récupération éventuelle d'infos manquantes
      if (!bookTitle && data.bookTitle) bookTitle = data.bookTitle;
      if (!author && data.author) author = data.author;
      if (!publicationYear && data.publicationYear) publicationYear = data.publicationYear;
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
    coverImage,
    description,
    chapters,
  };
});

const outputFile = path.join(process.cwd(), "data", "books.json");
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(books, null, 2));
console.log("✅ books.json généré avec succès avec descriptions dans /data");
