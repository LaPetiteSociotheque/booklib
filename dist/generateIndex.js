"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const contentDir = path_1.default.join(process.cwd(), 'content', 'books');
const authorsIndex = {};
const conceptsIndex = {};
const bookSlugs = fs_1.default.readdirSync(contentDir);
for (const bookSlug of bookSlugs) {
    const bookPath = path_1.default.join(contentDir, bookSlug);
    const chapterFiles = fs_1.default.readdirSync(bookPath);
    for (const filename of chapterFiles) {
        if (!filename.endsWith('.md'))
            continue;
        const chapterSlug = filename.replace(/\.md$/, '');
        const fullPath = path_1.default.join(bookPath, filename);
        const fileContents = fs_1.default.readFileSync(fullPath, 'utf-8');
        const { data } = (0, gray_matter_1.default)(fileContents);
        const entry = {
            bookSlug,
            chapterSlug,
            title: data.title || chapterSlug,
        };
        // Indexation des auteurs
        const authors = data.authors || [];
        authors.forEach((author) => {
            if (!authorsIndex[author])
                authorsIndex[author] = [];
            authorsIndex[author].push(entry);
        });
        // Indexation des concepts
        const concepts = data.concepts || [];
        concepts.forEach((concept) => {
            if (!conceptsIndex[concept])
                conceptsIndex[concept] = [];
            conceptsIndex[concept].push(entry);
        });
    }
}
// Création du dossier data s'il n'existe pas
const dataDir = path_1.default.join(process.cwd(), 'data');
if (!fs_1.default.existsSync(dataDir))
    fs_1.default.mkdirSync(dataDir);
// Sauvegarde des fichiers JSON
fs_1.default.writeFileSync(path_1.default.join(dataDir, 'authors.json'), JSON.stringify(authorsIndex, null, 2), 'utf-8');
fs_1.default.writeFileSync(path_1.default.join(dataDir, 'concepts.json'), JSON.stringify(conceptsIndex, null, 2), 'utf-8');
console.log('✅ Index des auteurs et concepts généré avec succès.');
