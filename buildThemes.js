const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const booksDir = path.join(__dirname, "content", "books");
const outputPath = path.join(__dirname, "data", "themes.json");

const themes = {};

fs.readdirSync(booksDir).forEach((bookSlug) => {
  const bookPath = path.join(booksDir, bookSlug);
  if (!fs.statSync(bookPath).isDirectory()) return;

  fs.readdirSync(bookPath).forEach((file) => {
    if (!file.endsWith(".md")) return;
    const filePath = path.join(bookPath, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    if (Array.isArray(data.themes)) {
      data.themes.forEach((theme) => {
        const title = theme.trim();
        const slug = title.toLowerCase().replace(/\s+/g, "-");

        if (!themes[slug]) {
          themes[slug] = {
            slug,
            title,
            description: "",
            books: new Set()
          };
        }

        themes[slug].books.add(bookSlug);
      });
    }
  });
});

// Convert books sets to arrays
const themesArray = Object.values(themes).map((t) => ({
  slug: t.slug,
  title: t.title,
  description: t.description,
  books: Array.from(t.books).sort()
}));

// Sort alphabetically
themesArray.sort((a, b) => a.title.localeCompare(b.title));

// Write to JSON
fs.writeFileSync(outputPath, JSON.stringify(themesArray, null, 2), "utf-8");
console.log("✅ data/themes.json generated successfully.");
