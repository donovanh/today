const puppeteer = require('puppeteer');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://hop.ie/today/');
  await wait(2000);
  await page.setViewport({
    width: 1200,
    height: 675,
    deviceScaleFactor: 1,
  });
  await page.screenshot({
    path: './site/today.png'
  });
  console.log('Screenshot written');
  await browser.close();
})();