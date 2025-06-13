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
      date: null,
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

    if (summaryData.title) bookTitle = summaryData.title;
    if (summaryData.author) author = summaryData.author;
    if (summaryData.publicationYear) publicationYear = summaryData.publicationYear;
    if (summaryData.pageCount) pageCount = summaryData.pageCount;

    description = summaryBody
      .split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .find((p) => p.length > 0)
      ?.replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1") || "";
  }

  const chapterDates = [];

  // Récupérer tous les chapitres
  const chapters = chapterFiles
    .filter((f) => f !== "_summary.md")
    .map((filename) => {
      const filePath = path.join(bookPath, filename);
      const { data } = matter(fs.readFileSync(filePath, "utf-8"));

      if (!bookTitle && data.bookTitle) bookTitle = data.bookTitle;
      if (!author && data.author) author = data.author;
      if (!publicationYear && data.publicationYear) publicationYear = data.publicationYear;
      if (!pageCount && data.pageCount) pageCount = data.pageCount;
      if (!coverImage && data.coverImage) coverImage = data.coverImage;

      if (data.date) {
        chapterDates.push(new Date(data.date));
      }

      return {
        title: data.title || filename.replace(".md", ""),
        slug: filename.replace(".md", ""),
        order: data.order || 0
        // 👇 on n’inclut plus la date ici
      };
    })
    .sort((a, b) => a.order - b.order);

  // Déterminer la date du livre (la plus récente des dates de chapitres)
  chapterDates.sort((a, b) => b - a);
  const date = chapterDates[0] ? chapterDates[0].toISOString().split("T")[0] : null;

  return {
    slug: bookSlug,
    title: bookTitle || bookSlug,
    author: author || "Auteur inconnu",
    publicationYear: publicationYear || null,
    pageCount: pageCount || null,
    coverImage,
    description,
    chapters,
    date,
  };
});

const outputFile = path.join(process.cwd(), "data", "books.json");
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(books, null, 2));
console.log("✅ books.json généré avec succès avec descriptions et dates dans /data");
