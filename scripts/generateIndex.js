"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var gray_matter_1 = require("gray-matter");
var contentDir = path_1.default.join(process.cwd(), 'content', 'books');
var authorsIndex = {};
var conceptsIndex = {};
var bookSlugs = fs_1.default.readdirSync(contentDir);
for (var _i = 0, bookSlugs_1 = bookSlugs; _i < bookSlugs_1.length; _i++) {
    var bookSlug = bookSlugs_1[_i];
    var bookPath = path_1.default.join(contentDir, bookSlug);
    var chapterFiles = fs_1.default.readdirSync(bookPath);
    var _loop_1 = function (filename) {
        if (!filename.endsWith('.md'))
            return "continue";
        var chapterSlug = filename.replace(/\.md$/, '');
        var fullPath = path_1.default.join(bookPath, filename);
        var fileContents = fs_1.default.readFileSync(fullPath, 'utf-8');
        var data = (0, gray_matter_1.default)(fileContents).data;
        var entry = {
            bookSlug: bookSlug,
            chapterSlug: chapterSlug,
            title: data.title || chapterSlug,
        };
        // Indexation des auteurs
        var authors = data.authors || [];
        authors.forEach(function (author) {
            if (!authorsIndex[author])
                authorsIndex[author] = [];
            authorsIndex[author].push(entry);
        });
        // Indexation des concepts
        var concepts = data.concepts || [];
        concepts.forEach(function (concept) {
            if (!conceptsIndex[concept])
                conceptsIndex[concept] = [];
            conceptsIndex[concept].push(entry);
        });
    };
    for (var _a = 0, chapterFiles_1 = chapterFiles; _a < chapterFiles_1.length; _a++) {
        var filename = chapterFiles_1[_a];
        _loop_1(filename);
    }
}
// Création du dossier data s'il n'existe pas
var dataDir = path_1.default.join(process.cwd(), 'data');
if (!fs_1.default.existsSync(dataDir))
    fs_1.default.mkdirSync(dataDir);
// Sauvegarde des fichiers JSON
fs_1.default.writeFileSync(path_1.default.join(dataDir, 'authors.json'), JSON.stringify(authorsIndex, null, 2), 'utf-8');
fs_1.default.writeFileSync(path_1.default.join(dataDir, 'concepts.json'), JSON.stringify(conceptsIndex, null, 2), 'utf-8');
console.log('✅ Index des auteurs et concepts généré avec succès.');
