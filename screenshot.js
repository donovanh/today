const puppeteer = require('puppeteer');
const fs = require('fs');

var dir = './_site';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    fs.copyFile('./site/index.html', dir + 'index.html', (err) => {
      if (err) throw err;
      console.log('Index.html file copied to _site');
    });
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://hop.ie/today/');
  await wait(1500);
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