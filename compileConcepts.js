const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONCEPTS_DIR = path.join(__dirname, "content", "concepts");
const OUTPUT_FILE = path.join(__dirname, "data", "concepts.json");

if (!fs.existsSync(CONCEPTS_DIR)) {
  console.error("❌ Dossier 'content/concepts/' introuvable.");
  process.exit(1);
}

const files = fs.readdirSync(CONCEPTS_DIR);

const concepts = files
  .filter(file => file.endsWith(".md"))
  .map(file => {
    const fullPath = path.join(CONCEPTS_DIR, file);
    const content = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(content);
    console.log("✅ Concept trouvé :", data);
    // Champs obligatoires
    if (!data.title || !data.slug) {
      console.warn(`⚠️ Champs manquants dans ${file}`);
    }

    return {
      title: data.title || "(titre manquant)",
      slug: data.slug || file.replace(".md", ""),
      definition: data.definition || "",
      historicalContext: data.historicalContext || "",
      books: data.books || []
    };
  });

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
console.log("📤 Enregistrement dans :", OUTPUT_FILE);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(concepts, null, 2));

console.log(`✅ ${concepts.length} concept(s) compilé(s) vers booklib/data/concepts.json`);
