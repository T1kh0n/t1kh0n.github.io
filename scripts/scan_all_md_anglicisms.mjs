import * as fs from 'fs';
import * as path from 'path';

function scanAllMarkdown(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) scanAllMarkdown(full);
    else if (full.endsWith('.md')) {
      const content = fs.readFileSync(full, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        // Find Latin words in prose (exclude URLs, markdown links formatting like `[...](...)`, math blocks `$ ... $`, etc.)
        let clean = line.replace(/https?:\/\/[^\s\)]+/g, '');
        clean = clean.replace(/\]\([^\)]+\)/g, ']'); // remove url part of links
        clean = clean.replace(/\$[^\$]+\$/g, ''); // remove math
        clean = clean.replace(/`[^`]+`/g, ''); // remove code
        clean = clean.replace(/<[^>]+>/g, ''); // remove html tags

        const words = clean.match(/[A-Za-zА-Яа-я0-9_-]+/g) || [];
        for (const w of words) {
          // Check if word has Latin letters
          if (/[A-Za-z]/.test(w)) {
            const lower = w.toLowerCase();
            const allowed = [
              'ra', 'it', 'it6', 'it7', 'it8', 'it9', 'it10', 'it11', 'it12', 'hrc', 'hb', 'hv', 'mpa',
              'aisi', 'din', 'iso', 'gost', 'step', 'iges', 'dxf', 'pdf', 'stl', 'cmm', 'cnc', 'chpu',
              'd16t', 'amg6', '40x', '12x18n10t', 'st45', 'st20', 'slug', 'title', 'category', 'publisheddate',
              'author', 'readingtime', 'tags', 'relatedarticles', 'relatedservices', 'seotitle', 'seodescription',
              'excerpt', 'aeosummary', 'targetaudience', 'directanswer', 'mm', 'kw', 'rpm', 'min', 'sec', 'mkm',
              'pvd', 'cvd', 'dlc', 'tialn', 'wnmg', 'cnmg', 'npt', 'b2b', 'b2c', 'otk', 'nda', 'fz', 'gost'
            ];
            if (!allowed.includes(lower)) {
              console.log(`${full}:${i+1} -> [${w}] in "${line.trim().slice(0, 90)}"`);
            }
          }
        }
      });
    }
  }
}

scanAllMarkdown('src/content');
