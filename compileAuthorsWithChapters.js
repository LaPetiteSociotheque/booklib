const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const contentDir = path.join(__dirname, "content");
const output = {};
  
function getAllMarkdownFiles(dir) {
  let files = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(getAllMarkdownFiles(fullPath));
    } else if (file.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = getAllMarkdownFiles(contentDir);

files.forEach(file => {
  const content = fs.readFileSync(file, "utf8");
  const { data } = matter(content);

  if (!data.author || !data.title) return;

  const authorName = data.author;
  const chapterData = {
    title: data.title,
    slug: data.slug || path.basename(file, ".md"),
  };

  if (!output[authorName]) {
    output[authorName] = {
      name: authorName,
      slug: authorName.toLowerCase().replace(/\s+/g, "-"),
      chapters: [chapterData],
    };
  } else {
    output[authorName].chapters.push(chapterData);
  }
});

fs.writeFileSync(path.join(__dirname, "data/authors.json"), JSON.stringify(Object.values(output), null, 2));
;
console.log("✅ authors.json généré !");
