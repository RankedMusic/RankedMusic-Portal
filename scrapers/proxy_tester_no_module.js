const puppeteer = require('puppeteer-extra');

// comment the following two lines if you don't want to include Stealth plugin 
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Using Sleath Puppeteer
async function main() {
  
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();

    //   await page.goto('https://whatismyipaddress.com/');
      await page.goto('https://www.instagram.com/');
    // await page.goto('https://www.instagram.com/marianamundov/');
    
    // await page.goto('http://lumtest.com/myip.json');
    // await page.goto('http://luminati.io');

    await page.screenshot({path: 'example.png'});
    //   await browser.close();
  }
  
  main();