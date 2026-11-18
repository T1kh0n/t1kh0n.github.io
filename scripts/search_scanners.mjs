import { chromium } from '@playwright/test';
import * as fs from 'fs';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    locale: 'ru-RU',
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  console.log('--- 1. Searching Google ---');
  let googleResults = [];
  try {
    await page.goto('https://www.google.com/search?q=%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%B8%D1%82%D1%8C+%D1%81%D0%B0%D0%B9%D1%82+%D0%BD%D0%B0+%D1%81%D0%BE%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D1%81%D1%82%D0%B2%D0%B8%D0%B5+152+%D1%84%D0%B7+%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD+%D1%81%D0%BA%D0%B0%D0%BD%D0%B5%D1%80&hl=ru', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);

    googleResults = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const items = [];
      for (const a of links) {
        const href = a.getAttribute('href');
        const h3 = a.querySelector('h3');
        if (h3 && href && href.startsWith('http') && !href.includes('google.com')) {
          items.push({ title: h3.innerText.trim(), url: href });
        }
      }
      return items;
    });
    console.log(`Google found ${googleResults.length} organic items`);
    for (const r of googleResults.slice(0, 10)) {
      console.log(`[Google] ${r.title} -> ${r.url}`);
    }
  } catch (err) {
    console.error('Google search error:', err.message);
  }

  console.log('\n--- 2. Searching Yandex ---');
  let yandexResults = [];
  try {
    await page.goto('https://ya.ru/search/?text=%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0+%D1%81%D0%B0%D0%B9%D1%82%D0%B0+%D0%BD%D0%B0+%D1%81%D0%BE%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D1%81%D1%82%D0%B2%D0%B8%D0%B5+152+%D1%84%D0%B7+%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD+%D1%81%D0%BA%D0%B0%D0%BD%D0%B5%D1%80', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(3000);

    yandexResults = await page.evaluate(() => {
      const items = [];
      const serpItems = document.querySelectorAll('li.serp-item, .Organic, .serp-list > li');
      for (const item of serpItems) {
        const a = item.querySelector('a.Link, a[href]');
        const titleEl = item.querySelector('.OrganicTitle-LinkText, h2, .organic__title-wrapper');
        if (a && a.href && a.href.startsWith('http') && !a.href.includes('yandex.') && !a.href.includes('ya.ru')) {
          const title = titleEl ? titleEl.innerText.trim() : (a.innerText.trim() || 'Link');
          items.push({ title, url: a.href });
        }
      }
      return items;
    });
    console.log(`Yandex found ${yandexResults.length} organic items`);
    for (const r of yandexResults.slice(0, 10)) {
      console.log(`[Yandex] ${r.title} -> ${r.url}`);
    }
  } catch (err) {
    console.error('Yandex search error:', err.message);
  }

  await browser.close();
}

main().catch(console.error);
