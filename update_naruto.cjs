const fs = require('fs');
const path = require('path');

const narutoDir = path.join(__dirname, 'public', 'naruto_pdf');
const dataTsPath = path.join(__dirname, 'src', 'data.ts');

const files = fs.readdirSync(narutoDir).filter(f => f.endsWith('.pdf'));

// Parse numbers to sort them correctly
files.sort((a, b) => {
  const matchA = a.match(/Tomo\s*(\d+)/i);
  const matchB = b.match(/Tomo\s*(\d+)/i);
  const numA = matchA ? parseInt(matchA[1], 10) : 999;
  const numB = matchB ? parseInt(matchB[1], 10) : 999;
  return numA - numB;
});

const narutoData = files.map((file, index) => {
  const match = file.match(/Tomo\s*(\d+)/i);
  const num = match ? match[1] : index + 1;
  return {
    id: index + 1,
    title: `Naruto - Tomo ${num}`,
    file: file,
    cover: `/covers/naruto_${num}.jpg`
  };
});

let dataTsContent = fs.readFileSync(dataTsPath, 'utf8');
if (dataTsContent.includes('export const narutoData')) {
  // Replace existing if exists
  dataTsContent = dataTsContent.replace(
    /export const narutoData = \[[\s\S]*?\];/, 
    `export const narutoData = ${JSON.stringify(narutoData, null, 2)};`
  );
} else {
  // Append
  dataTsContent += `\nexport const narutoData = ${JSON.stringify(narutoData, null, 2)};\n`;
}

fs.writeFileSync(dataTsPath, dataTsContent);
console.log('Successfully updated data.ts with narutoData!');
