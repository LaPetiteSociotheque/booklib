// compileAuthors.js

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const contentDir = path.join(__dirname, "content");
const authorsSet = new Set();

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

  if (data.author) {
    authorsSet.add(data.author);
  }
});

const authorsArray = Array.from(authorsSet).map(name => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, "-"),
}));

fs.writeFileSync(
  path.join(__dirname, "data/authorsbasic.json"),
  JSON.stringify(authorsArray, null, 2)
);

console.log("✅ Liste d’auteurs générée dans /data/authorsbasic.json");
