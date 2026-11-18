import * as fs from 'fs';
import * as path from 'path';

function findFiles(dir, exts) {
  let res = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.git' && item.name !== '.svelte-kit') {
        res = res.concat(findFiles(full, exts));
      }
    } else if (exts.some(ext => item.name.endsWith(ext))) {
      res.push(full);
    }
  }
  return res;
}

const files = findFiles('src', ['.md', '.svelte']);
const latinWordRegex = /\b[A-Za-z][A-Za-z0-9_-]{1,}\b/g;

const foundWords = new Map();

for (const f of files) {
  let content = fs.readFileSync(f, 'utf-8');
  if (f.endsWith('.svelte')) {
    content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
    content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
  }
  // strip code blocks
  content = content.replace(/```[\s\S]*?```/g, '');
  content = content.replace(/`[^`]+`/g, '');
  // strip html tags attributes
  content = content.replace(/<[^>]+>/g, ' ');

  const matches = content.match(latinWordRegex) || [];
  for (const m of matches) {
    if (!foundWords.has(m)) {
      foundWords.set(m, []);
    }
    foundWords.get(m).push(f);
  }
}

const sorted = Array.from(foundWords.entries()).sort((a,b) => b[1].length - a[1].length);
console.log(`Total unique latin words found: ${sorted.length}`);
for (const [w, occurrences] of sorted) {
  if (occurrences.length >= 2) {
    console.log(`${w}: ${occurrences.length} files (e.g. ${occurrences[0]})`);
  }
}
