import { chromium } from '@playwright/test';
import * as dns from 'dns/promises';

const BASE_URL = 'https://t1kh0n.github.io';
const pagesToAudit = [
  '/',
  '/kalkulyator/',
  '/tekhnologii/',
  '/otk/',
  '/kontakty/',
  '/oferta/',
  '/politika-konfidentsialnosti/',
  '/politika-cookie/'
];

async function runAudit() {
  console.log(`Starting automated Playwright compliance audit for ${BASE_URL}...`);

  // 1. DNS & IP Geolocation check
  let domain = 't1kh0n.github.io';
  let ips = [];
  try {
    ips = await dns.resolve4(domain);
  } catch (e) {
    console.error('DNS error:', e.message);
  }
  console.log(`Resolved IPs for ${domain}:`, ips);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    locale: 'ru-RU'
  });

  const networkRequests = [];
  const pageErrors = [];

  const page = await context.newPage();

  page.on('request', req => {
    const url = req.url();
    networkRequests.push({
      url,
      method: req.method(),
      resourceType: req.resourceType(),
      origin: new URL(url).origin
    });
  });

  page.on('pageerror', err => pageErrors.push(err.message));

  console.log(`\nNavigating to ${BASE_URL}/ on a clean session...`);
  await page.goto(`${BASE_URL}/`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1000);

  // Check initial cookies before consent
  const initialCookies = await context.cookies();
  console.log(`Initial cookies before interaction: ${initialCookies.length}`, initialCookies.map(c => c.name));

  // Check cookie banner existence & buttons
  const cookieBanner = await page.evaluate(() => {
    const aside = document.querySelector('aside[role="region"], div[role="region"], .cookie-notice, [data-testid="cookie-banner"]');
    if (!aside) return null;
    const buttons = Array.from(aside.querySelectorAll('button')).map(b => b.innerText.trim());
    return {
      text: aside.innerText.trim().slice(0, 300),
      buttons
    };
  });
  console.log('Cookie banner detected:', cookieBanner);

  // Check forms & inputs on home page
  const homeInputs = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input, textarea, select')).map(el => ({
      tagName: el.tagName,
      type: el.getAttribute('type'),
      name: el.getAttribute('name'),
      id: el.getAttribute('id'),
      placeholder: el.getAttribute('placeholder')
    }));
    const forms = Array.from(document.querySelectorAll('form')).map(f => ({
      action: f.getAttribute('action'),
      method: f.getAttribute('method')
    }));
    return { inputs, forms };
  });
  console.log('Home page forms & inputs:', homeInputs);

  // Check external network origins
  const externalOrigins = [...new Set(networkRequests.map(r => r.origin))].filter(o => !o.includes('t1kh0n.github.io'));
  console.log('External network origins loaded:', externalOrigins);

  // Check footer links for legal compliance
  const footerLinks = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return [];
    return Array.from(footer.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href')
    }));
  });
  console.log('Footer links:', footerLinks);

  // Check legal requisites (ИНН, ОГРН, etc.) in DOM
  const legalRequisites = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    const hasInn = /ИНН\s*[:\d]/i.test(bodyText) || bodyText.includes('ИНН');
    const hasOgrn = /ОГРН/i.test(bodyText);
    const hasArbitration = /арбитраж/i.test(bodyText);
    const hasAddress = /Калининград/i.test(bodyText);
    return { hasInn, hasOgrn, hasArbitration, hasAddress };
  });
  console.log('Legal requisites on homepage:', legalRequisites);

  // Audit all pages for forms, links, and content
  for (const path of pagesToAudit) {
    console.log(`\n--- Auditing ${path} ---`);
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load', timeout: 15000 });
    const pInfo = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"])')).map(i => ({
        type: i.type,
        placeholder: i.placeholder,
        name: i.name
      }));
      const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')).map(c => ({
        checked: c.checked,
        id: c.id
      }));
      const title = document.title;
      const h1 = document.querySelector('h1')?.innerText?.trim();
      const body = document.body.innerText;
      return {
        title,
        h1,
        inputsCount: inputs.length,
        inputs,
        checkboxes,
        hasInn: body.includes('ИНН'),
        hasOgrn: body.includes('ОГРН') || body.includes('ОГРНИП'),
        hasOfertaLink: Array.from(document.querySelectorAll('a')).some(a => a.href.includes('oferta')),
        hasPrivacyLink: Array.from(document.querySelectorAll('a')).some(a => a.href.includes('politika-konfidentsialnosti')),
        hasCookieLink: Array.from(document.querySelectorAll('a')).some(a => a.href.includes('politika-cookie'))
      };
    });
    console.log(`Page: ${path} ->`, pInfo);
  }

  await browser.close();
  console.log('\nAudit complete.');
}

runAudit().catch(console.error);
