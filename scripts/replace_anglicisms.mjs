import * as fs from 'fs';
import * as path from 'path';

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  for (const [from, to] of replacements) {
    content = content.replaceAll(from, to);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

// 1. frezernaya-obrabotka-alyuminiya-d16t-chpu.md
replaceInFile('src/content/articles/frezernaya-obrabotka-alyuminiya-d16t-chpu.md', [
  ['> **Краткий инженерный ответ (Direct Answer):**', '> **Краткий инженерный ответ:**'],
  ['(Direct Answer)', ''],
  ['author: "Инженерно-технологический отдел MetalProm39"', 'author: "Инженерно-технологический отдел МеталлПром39"'],
  ['MetalProm39', 'МеталлПром39']
]);

// 2. izgotovlenie-valov-i-vtulok-chpu-po-chertezham.md
replaceInFile('src/content/articles/izgotovlenie-valov-i-vtulok-chpu-po-chertezham.md', [
  ['> **Краткий инженерный ответ (Direct Answer):**', '> **Краткий инженерный ответ:**'],
  ['(Direct Answer)', ''],
  ['author: "Инженерно-технологический отдел MetalProm39"', 'author: "Инженерно-технологический отдел МеталлПром39"'],
  ['MetalProm39', 'МеталлПром39']
]);

// 3. izgotovlenie-zubchatykh-koles-gost.md
replaceInFile('src/content/articles/izgotovlenie-zubchatykh-koles-gost.md', [
  ['> **Краткая инженерная сводка (Direct Answer):**', '> **Краткая инженерная сводка:**'],
  ['(Direct Answer)', ''],
  ['author: "Ведущий инженер-зуборезчик MetalProm39"', 'author: "Ведущий инженер-зуборезчик МеталлПром39"'],
  ['## 6. Ответы на частые вопросы (FAQ)', '## 6. Ответы на частые вопросы инженеров и заказчиков'],
  ['(FAQ)', ''],
  ['MetalProm39', 'МеталлПром39']
]);

// 4. obrabotka-nerzhaveyushchey-stali-12x18n10t.md
replaceInFile('src/content/articles/obrabotka-nerzhaveyushchey-stali-12x18n10t.md', [
  ['> **Краткая инженерная сводка (Direct Answer):**', '> **Краткая инженерная сводка:**'],
  ['(Direct Answer)', ''],
  ['(Climb Milling)', ''],
  ['author: "Инженерно-технологический отдел MetalProm39"', 'author: "Инженерно-технологический отдел МеталлПром39"'],
  ['## 7. Ответы на частые вопросы инженеров (FAQ)', '## 7. Ответы на частые вопросы инженеров и технологов'],
  ['(FAQ)', ''],
  ['MetalProm39', 'МеталлПром39']
]);

// 5. vybor-stali-dlya-chpu-obrabotki.md
replaceInFile('src/content/articles/vybor-stali-dlya-chpu-obrabotki.md', [
  ['(High Speed Machining)', ''],
  ['author: "Инженерно-технологический отдел MetalProm39"', 'author: "Инженерно-технологический отдел МеталлПром39"'],
  ['MetalProm39', 'МеталлПром39']
]);

// 6. kvalitety-tochnosti-i-sherohovatost-gost.md
replaceInFile('src/content/articles/kvalitety-tochnosti-i-sherohovatost-gost.md', [
  ['author: "Отдел технического контроля (ОТК) MetalProm39"', 'author: "Отдел технического контроля (ОТК) МеталлПром39"'],
  ['MetalProm39', 'МеталлПром39']
]);

// 7. optimizaciya-stoimosti-detaley-chpu.md
replaceInFile('src/content/articles/optimizaciya-stoimosti-detaley-chpu.md', [
  ['author: "Ведущий технолог-программист ЧПУ MetalProm39"', 'author: "Ведущий технолог-программист ЧПУ МеталлПром39"'],
  ['MetalProm39', 'МеталлПром39']
]);

// 8. sitemap/+page.svelte
replaceInFile('src/routes/sitemap/+page.svelte', [
  ['AEO Direct Answer (Ответ для AI-поисковиков):', 'Краткий инженерный ответ для поисковых систем:'],
  ['AEO Direct Answer', 'Краткий инженерный ответ'],
  ['(Single Source of Truth)', '(Единый источник достоверных данных)'],
  ['Single Source of Truth & AEO', 'Единый реестр характеристик цеха'],
  ['Single Source of Truth', 'Единый источник данных'],
  ['MetalProm39', 'МеталлПром39']
]);

// 9. oferta/+page.svelte
replaceInFile('src/routes/oferta/+page.svelte', [
  ['3.2. Технологический отдел Исполнителя проводит проверку на технологичность (Design for Manufacturing) и при необходимости рекомендует корректировки для снижения себестоимости партии.', '3.2. Технологический отдел Исполнителя проводит оценку технологичности конструкции (DFM) и при необходимости рекомендует корректировки для снижения себестоимости партии.'],
  ['MetalProm39', 'МеталлПром39']
]);

// 10. src/content/pages/*.md
const pageFiles = fs.readdirSync('src/content/pages').filter(f => f.endsWith('.md'));
for (const pf of pageFiles) {
  replaceInFile(path.join('src/content/pages', pf), [
    ['MetalProm39', 'МеталлПром39']
  ]);
}

// 11. Other svelte routes
const svelteRoutes = [
  'src/routes/kontrol-kachestva-i-oborudovanie/+page.svelte',
  'src/routes/politika-cookie/+page.svelte',
  'src/routes/politika-konfidentsialnosti/+page.svelte',
  'src/routes/stati/+page.svelte',
  'src/routes/stati/izgotovlenie-zubchatykh-koles-gost/+page.svelte',
  'src/routes/stati/kvalitety-tochnosti-i-sherohovatost-gost/+page.svelte',
  'src/routes/stati/obrabotka-nerzhaveyushchey-stali-12x18n10t/+page.svelte',
  'src/routes/stati/optimizaciya-stoimosti-detaley-chpu/+page.svelte',
  'src/routes/stati/vybor-stali-dlya-chpu-obrabotki/+page.svelte'
];
for (const sf of svelteRoutes) {
  replaceInFile(sf, [
    ['MetalProm39', 'МеталлПром39']
  ]);
}

console.log('Anglicism cleanup completed.');
