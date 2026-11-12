const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'artworksData.js');
const s = fs.readFileSync(dataPath, 'utf8');

// Match artist: "..." occurrences
const re = /artist:\s*"([^"\n]+)"/g;
const artists = [...s.matchAll(re)].map(m => m[1].trim());
const total = artists.length;
const unique = [...new Set(artists)];

console.log(JSON.stringify({ total, uniqueCount: unique.length, unique }, null, 2));
