import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'ru-RU'
  });
  const page = await context.newPage();

  console.log('Testing Google...');
  await page.goto('https://www.google.com/search?q=%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0+%D1%81%D0%B0%D0%B9%D1%82%D0%B0+152+%D1%84%D0%B7+%D1%81%D0%BA%D0%B0%D0%BD%D0%B5%D1%80&hl=ru', { waitUntil: 'networkidle', timeout: 15000 }).catch(e => console.log('Google wait error', e.message));
  console.log('Google title:', await page.title());
  console.log('Google URL:', page.url());
  const gText = await page.evaluate(() => document.body.innerText.slice(0, 500));
  console.log('Google snippet:', gText.replace(/\n+/g, ' '));

  console.log('\nTesting Yandex...');
  await page.goto('https://ya.ru/search/?text=%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0+%D1%81%D0%B0%D0%B9%D1%82%D0%B0+152+%D1%84%D0%B7+%D1%81%D0%BA%D0%B0%D0%BD%D0%B5%D1%80', { waitUntil: 'networkidle', timeout: 15000 }).catch(e => console.log('Yandex wait error', e.message));
  console.log('Yandex title:', await page.title());
  console.log('Yandex URL:', page.url());
  const yText = await page.evaluate(() => document.body.innerText.slice(0, 500));
  console.log('Yandex snippet:', yText.replace(/\n+/g, ' '));

  await browser.close();
}

main().catch(console.error);
