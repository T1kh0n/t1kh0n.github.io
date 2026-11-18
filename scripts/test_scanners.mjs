import { chromium } from '@playwright/test';

const TARGET_URL = 'https://t1kh0n.github.io/';

const scanners = [
  // Google search group:
  { id: 'scanbase', group: 'Google', name: 'ScanBase', url: 'https://scanbase.ru/' },
  { id: 'fzscan', group: 'Google', name: 'FZScan', url: 'https://fzscan.ru/' },
  { id: '1ps', group: 'Google', name: '1PS FZ-152 Audit', url: 'https://1ps.ru/tools/fz-152/' },
  { id: 'hostinside', group: 'Google', name: 'HostInside Audit', url: 'https://hostinside.ru/' },
  { id: 'ci9', group: 'Google', name: 'CI9 Audit', url: 'https://ci9.ru/' },
  // Yandex search group:
  { id: 'prcy', group: 'Yandex', name: 'PR-CY Analysis', url: 'https://pr-cy.ru/' },
  { id: 'b152', group: 'Yandex', name: 'B-152 Privacy Check', url: 'https://privacy-check.ru/' },
  { id: 'scanetika', group: 'Yandex', name: 'Scanetika', url: 'https://scanetika.ru/' },
  { id: 'rffz', group: 'Yandex', name: 'RFFZ / Roskom24', url: 'https://rffz.ru/' },
  { id: '2ip', group: 'Yandex', name: '2IP Whois & Geo', url: 'https://2ip.ru/' }
];

async function checkSite() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'ru-RU'
  });
  const page = await context.newPage();

  for (const s of scanners) {
    console.log(`\n========================================`);
    console.log(`[${s.group}] Testing ${s.name} (${s.url})...`);
    try {
      const resp = await page.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      console.log(`Status: ${resp ? resp.status() : 'null'}, Title: ${await page.title()}`);
      
      // Look for input fields
      const inputs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input, button')).map(el => ({
          tag: el.tagName,
          type: el.getAttribute('type'),
          placeholder: el.getAttribute('placeholder'),
          name: el.getAttribute('name'),
          id: el.getAttribute('id'),
          value: el.getAttribute('value'),
          text: el.innerText ? el.innerText.trim() : ''
        })).filter(i => (i.placeholder || i.type === 'submit' || i.text.includes('Провер') || i.text.includes('Анализ') || i.text.includes('Начать')));
      });
      console.log(`Found relevant inputs/buttons:`, JSON.stringify(inputs.slice(0, 5)));
    } catch (e) {
      console.log(`Error visiting ${s.name}: ${e.message}`);
    }
  }

  await browser.close();
}

checkSite().catch(console.error);
