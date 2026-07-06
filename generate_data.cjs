const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, 'public');
const coversDir = path.join(publicDir, 'covers');

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir);
}

const folders = [
  { name: 'Snk', path: 'Snk', prefix: 'snk' },
  { name: 'Nana', path: 'Nana/Nana', prefix: 'nana' },
  { name: 'THG', path: 'thg', prefix: 'thg' }
];

let allData = {};

folders.forEach(folder => {
  const dirPath = path.join(publicDir, folder.path);
  const files = fs.readdirSync(dirPath).filter(f => f.toLowerCase().endsWith('.pdf'));
  
  // Sort files logically (by number if possible)
  files.sort((a, b) => {
    const numA = a.match(/\d+/) ? parseInt(a.match(/\d+/)[0]) : 0;
    const numB = b.match(/\d+/) ? parseInt(b.match(/\d+/)[0]) : 0;
    return numA - numB;
  });

  const items = files.map((file, index) => {
    const pdfPath = path.join(dirPath, file);
    const coverName = `${folder.prefix}_${index}.png`;
    const coverPath = path.join(coversDir, coverName);
    
    console.log(`Extracting cover for ${file}...`);
    try {
      // Use sips to extract first page and resize it to save space
      execSync(`sips -s format png -Z 400 "${pdfPath}" --out "${coverPath}"`, { stdio: 'ignore' });
    } catch (e) {
      console.log(`Failed for ${file}`);
    }

    let title = file.replace(/\.pdf$/i, '').replace(/_/g, ' ');
    if (folder.name === 'Snk') title = `Shingeki no Kyojin - ${title.replace('S-N-K-', 'Tomo ')}`;
    
    return {
      id: index + 1,
      title: title,
      file: file,
      cover: `/covers/${coverName}`
    };
  });
  
  allData[folder.name] = items;
});

const tsContent = `export const snkData = ${JSON.stringify(allData.Snk, null, 2)};\n\n` +
                  `export const nanaData = ${JSON.stringify(allData.Nana, null, 2)};\n\n` +
                  `export const thgData = ${JSON.stringify(allData.THG, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, 'src', 'data.ts'), tsContent);
console.log('Done!');
