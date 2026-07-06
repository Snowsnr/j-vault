const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Simple regex replace for titles in data.ts
// We know the format is like "title": "Shingeki no Kyojin - Tomo 01"

// THG explicit names
const thgNames = {
  'LOS JUEGOS DEL HAMBRE': 'Libro 1 - Los Juegos del Hambre',
  'En Llamas': 'Libro 2 - En Llamas',
  'Sinsajo Suzanne Collins (1)': 'Libro 3 - Sinsajo',
  'Balada de pajaros cantores y serpientes': 'Precuela - Balada de pájaros cantores y serpientes',
  'Amanecer en la cosecha - Suzanne Collins ESPAÑOL OFICIAL': 'Precuela - Amanecer en la cosecha'
};

const snkRegex = /"title":\s*"Tomo (\d+) \(Capítulos (\d+)-(\d+)\)"/g;
content = content.replace(snkRegex, (match, numStr, capStart, capEnd) => {
  return `"title": "Shingeki no Kyojin - Tomo ${numStr} (Cap. ${capStart}-${capEnd})"`;
});

const nanaRegex = /"title":\s*"Nana (\d+)"/g;
content = content.replace(nanaRegex, (match, numStr) => {
  const num = parseInt(numStr, 10);
  const capStart = (num - 1) * 4 + 1;
  const capEnd = num * 4;
  return `"title": "Nana - Tomo ${num} (Cap. ${capStart}-${capEnd})"`;
});

// THG replaces
for (const [oldName, newName] of Object.entries(thgNames)) {
  content = content.replace(`"title": "${oldName}"`, `"title": "${newName}"`);
}

fs.writeFileSync(dataPath, content);
console.log('Titles updated!');
