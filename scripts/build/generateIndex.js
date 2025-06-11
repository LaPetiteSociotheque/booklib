"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const contentDir = path.join(process.cwd(), 'content', 'books');
const authorsIndex = {};
const conceptsIndex = {};
const bookSlugs = fs.readdirSync(contentDir);
for (const bookSlug of bookSlugs) {
    const bookPath = path.join(contentDir, bookSlug);
    const chapterFiles = fs.readdirSync(bookPath);
    for (const filename of chapterFiles) {
        if (!filename.endsWith('.md'))
            continue;
        const chapterSlug = filename.replace(/\.md$/, '');
        const fullPath = path.join(bookPath, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');
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
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir))
    fs.mkdirSync(dataDir);
// Sauvegarde des fichiers JSON
fs.writeFileSync(path.join(dataDir, 'authors.json'), JSON.stringify(authorsIndex, null, 2), 'utf-8');
fs.writeFileSync(path.join(dataDir, 'concepts.json'), JSON.stringify(conceptsIndex, null, 2), 'utf-8');
console.log('✅ Index des auteurs et concepts généré avec succès.');
