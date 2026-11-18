import { chromium } from '@playwright/test';

const TARGET_DOMAIN = 't1kh0n.github.io';
const TARGET_URL = `https://${TARGET_DOMAIN}/`;

async function main() {
  console.log(`Starting in-depth Playwright analyzer checks for ${TARGET_URL}...\n`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    locale: 'ru-RU',
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // ==========================================
  // 1. BE1.RU - Russian Site & Compliance Analyzer
  // ==========================================
  console.log('--- 1. Checking BE1.ru Analyzer ---');
  try {
    const be1Url = `https://be1.ru/stat/${TARGET_DOMAIN}`;
    await page.goto(be1Url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(4000);
    const be1Data = await page.evaluate(() => {
      const title = document.title;
      const text = document.body.innerText;
      
      const getMetric = (label) => {
        const regex = new RegExp(`${label}[:\\s]+([^\\n]+)`, 'i');
        const match = text.match(regex);
        return match ? match[1].trim() : null;
      };

      const warnings = Array.from(document.querySelectorAll('.danger, .warning, .alert, .text-danger, .badge-danger, .badge-warning'))
        .map(el => el.innerText.trim())
        .filter(t => t.length > 2 && t.length < 200);

      const success = Array.from(document.querySelectorAll('.success, .text-success, .badge-success'))
        .map(el => el.innerText.trim())
        .filter(t => t.length > 2 && t.length < 200);

      return {
        title,
        warnings: warnings.slice(0, 10),
        success: success.slice(0, 10),
        hasHttps: /https[:\s]+да|ssl[:\s]+да|защищен/i.test(text),
        hasRobots: /robots\.txt[:\s]+да|найден/i.test(text),
        hasSitemap: /sitemap\.xml[:\s]+да|найден/i.test(text),
        hasMetrika: /метрика[:\s]+да|yandex\.metrika/i.test(text)
      };
    });
    console.log('BE1.ru Analysis Results:', JSON.stringify(be1Data, null, 2));
  } catch (e) {
    console.log('BE1.ru Error:', e.message);
  }

  // ==========================================
  // 2. SEOLIK.RU - Russian Webmaster & SEO Analyzer
  // ==========================================
  console.log('\n--- 2. Checking Seolik.ru Analyzer ---');
  try {
    await page.goto('https://seolik.ru/', { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(2000);
    
    // Fill URL and submit
    const urlInput = page.locator('input[name="url"]').first();
    if (await urlInput.isVisible()) {
      await urlInput.fill(TARGET_DOMAIN);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(5000);
      
      const seolikResults = await page.evaluate(() => {
        const title = document.title;
        const text = document.body.innerText;
        return {
          title,
          url: window.location.href,
          textSnippet: text.slice(0, 500).replace(/\n+/g, ' ')
        };
      });
      console.log('Seolik.ru Analysis Results:', JSON.stringify(seolikResults, null, 2));
    } else {
      console.log('Seolik.ru URL input not visible');
    }
  } catch (e) {
    console.log('Seolik.ru Error:', e.message);
  }

  // ==========================================
  // 3. W3C Nu HTML Validator - Standards Compliance
  // ==========================================
  console.log('\n--- 3. Checking W3C Nu HTML Validator ---');
  try {
    const w3cUrl = `https://validator.w3.org/nu/?doc=${encodeURIComponent(TARGET_URL)}`;
    await page.goto(w3cUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(3000);
    const w3cData = await page.evaluate(() => {
      const errors = Array.from(document.querySelectorAll('li.error, .msg_err, p.error')).map(el => el.innerText.trim().slice(0, 200));
      const warnings = Array.from(document.querySelectorAll('li.warning, .msg_warn, p.warning')).map(el => el.innerText.trim().slice(0, 200));
      const success = document.querySelector('#results')?.innerText?.includes('The document validates') || document.body.innerText.includes('The document validates');
      return {
        success,
        errorCount: errors.length,
        errors: errors.slice(0, 5),
        warningCount: warnings.length,
        warnings: warnings.slice(0, 5)
      };
    });
    console.log('W3C Validator Results:', JSON.stringify(w3cData, null, 2));
  } catch (e) {
    console.log('W3C Error:', e.message);
  }

  // ==========================================
  // 4. Mozilla Observatory - Security & Headers Analyzer
  // ==========================================
  console.log('\n--- 4. Checking Mozilla Observatory Security Analyzer ---');
  try {
    const obsUrl = `https://observatory.mozilla.org/analyze/${TARGET_DOMAIN}`;
    await page.goto(obsUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(4000);
    const obsData = await page.evaluate(() => {
      const grade = document.querySelector('.grade, .score, h1, [data-testid="grade"]')?.innerText?.trim();
      const text = document.body.innerText;
      return {
        title: document.title,
        grade,
        snippet: text.slice(0, 400).replace(/\n+/g, ' ')
      };
    });
    console.log('Mozilla Observatory Results:', JSON.stringify(obsData, null, 2));
  } catch (e) {
    console.log('Mozilla Observatory Error:', e.message);
  }

  // ==========================================
  // 5. In-Browser Core Web Vitals & Font CLS Measurement
  // ==========================================
  console.log('\n--- 5. Measuring Real Cumulative Layout Shift (CLS) & Font Jumping ---');
  try {
    await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 15000 });
    
    // Evaluate layout shifts in real time
    const perfMetrics = await page.evaluate(async () => {
      let cls = 0;
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => {
          // Check font loading status
          const fontsLoaded = document.fonts ? document.fonts.status : 'unknown';
          const fontFaces = [];
          if (document.fonts) {
            document.fonts.forEach(f => fontFaces.push({ family: f.family, status: f.status }));
          }
          resolve({
            cumulativeLayoutShift: cls,
            clsGrade: cls === 0 ? 'PERFECT (0.000)' : cls < 0.1 ? 'GOOD' : 'POOR',
            fontsStatus: fontsLoaded,
            fontFaces: fontFaces.slice(0, 4)
          });
        }, 1500);
      });
    });
    console.log('Core Web Vitals & Font Layout Shift Metrics:', JSON.stringify(perfMetrics, null, 2));
  } catch (e) {
    console.log('Perf Metrics Error:', e.message);
  }

  await browser.close();
  console.log('\nAll analyzer checks completed.');
}

main().catch(console.error);
