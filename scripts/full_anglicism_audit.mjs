import * as fs from 'fs';
import * as path from 'path';

const files = [
  'src/content/articles/frezernaya-obrabotka-alyuminiya-d16t-chpu.md',
  'src/content/articles/izgotovlenie-valov-i-vtulok-chpu-po-chertezham.md',
  'src/content/articles/izgotovlenie-zubchatykh-koles-gost.md',
  'src/content/articles/kvalitety-tochnosti-i-sherohovatost-gost.md',
  'src/content/articles/obrabotka-nerzhaveyushchey-stali-12x18n10t.md',
  'src/content/articles/optimizaciya-stoimosti-detaley-chpu.md',
  'src/content/articles/vybor-stali-dlya-chpu-obrabotki.md',
  'src/content/pages/oferta.md',
  'src/routes/oferta/+page.svelte',
  'src/routes/sitemap/+page.svelte',
  'src/routes/+page.svelte',
  'src/lib/components/Footer.svelte'
];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const content = fs.readFileSync(f, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    // Look for suspicious latin patterns
    if (/(Direct Answer|High Speed Machining|Climb Milling|Single Source of Truth|Design for Manufacturing|\bDFM\b|\bFAQ\b|MetalProm39)/i.test(line)) {
      console.log(`${f}:${i+1} -> ${line.trim()}`);
    }
  });
}
