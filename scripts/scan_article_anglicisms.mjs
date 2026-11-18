import * as fs from 'fs';
import * as path from 'path';

const articlesDir = 'src/content/articles';
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

console.log('--- Scanning Articles for English words and Anglicisms ---');

for (const file of files) {
  const p = path.join(articlesDir, file);
  const raw = fs.readFileSync(p, 'utf-8');
  
  // Find lines with English words that are not purely technical formulas/standards
  const lines = raw.split('\n');
  lines.forEach((line, idx) => {
    // Check if line contains english words
    const matches = line.match(/[A-Za-z]{2,}/g);
    if (matches) {
      // Filter out markdown syntax like hrefs, img tags, or common units like Ra, IT, HRC, HB, ISO, DIN, GOST, mm, mkm, etc.
      const interesting = matches.filter(w => {
        const lower = w.toLowerCase();
        const allowed = [
          'ra', 'it', 'it7', 'it8', 'it9', 'it10', 'it11', 'it12', 'it6', 'hrc', 'hb', 'hv', 'mpa', 'aisi', 'din', 'iso', 'gost', 
          'step', 'iges', 'dxf', 'pdf', 'stl', 'cmm', 'cnc', 'chpu', 'd16t', 'amg6', '40x', '12x18n10t', 'st45', 'st20',
          'https', 'http', 'com', 'ru', 'png', 'webp', 'svg', 'jpg', 'src', 'alt', 'href', 'id', 'class', 'width', 'height',
          'div', 'span', 'strong', 'table', 'th', 'tr', 'td', 'style', 'color', 'bg', 'br', 'li', 'ul', 'ol', 'p', 'h1', 'h2', 'h3', 'h4',
          'katex', 'frac', 'sqrt', 'cdot', 'pi', 'sigma', 'alpha', 'beta', 'delta', 'eta', 'epsilon', 'times', 'text', 'approx', 'le', 'ge',
          'lim', 'max', 'min', 'sin', 'cos', 'tan', 'mm', 'kw', 'rpm', 'min', 'sec'
        ];
        return !allowed.includes(lower);
      });
      if (interesting.length > 0) {
        console.log(`[${file}:${idx + 1}] -> ${interesting.join(', ')}`);
        console.log(`    Line: ${line.trim().slice(0, 120)}`);
      }
    }
  });
}
