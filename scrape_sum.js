import { chromium } from 'playwright';

const seeds = Array.from({ length: 10 }, (_, i) => 23 + i);
let grandTotal = 0;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const seed of seeds) {
  const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
  console.log(`Visiting ${url}`);

  await page.goto(url);
  await page.waitForSelector("table");

  const numbers = await page.$$eval("table td", tds =>
    tds.map(td => parseFloat(td.textContent.replace(/,/g, '')))
        .filter(n => !isNaN(n))
  );

  const sum = numbers.reduce((acc, n) => acc + n, 0);
  console.log(`Seed ${seed} → Sum: ${sum}`);
  grandTotal += sum;
}

console.log(`\n✅ GRAND TOTAL: ${grandTotal}`);
await browser.close();
