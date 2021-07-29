import puppeteer from 'puppeteer'
import proxyChain from 'proxy-chain'

// Trying using Bright Data isp
// async function main() {
//   // const oldProxyUrl = 'http://lum-customer-c_71a587f8-zone-zone1:rv8o4uw9ml3o@zproxy.lum-superproxy.io:22225';
//   // const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
//     const browser = await puppeteer.launch({
//       headless: false,
//       args: [
//              '--proxy-server=zproxy.lum-superproxy.io:22225']
//     });
//     const page = await browser.newPage();
//       await page.authenticate({
//           username: 'lum-customer-c_71a587f8-zone-isp',
//           password: '2ue6ww94j2hn'
//       });
//       // await page.goto('https://ipinfo.io/json');
//       // await page.goto('https://whatismyipaddress.com/');
//       // await page.goto('https://www.instagram.com/');
//     // await page.goto('https://www.instagram.com/marianamundov/');
//     await page.goto('https://www.instagram.com/solmorr/');
    
//     // await page.goto('http://lumtest.com/myip.json');
//     // await page.goto('http://luminati.io');

//     await page.screenshot({path: 'example.png'});
//     //   await browser.close();
//   }
  
//   main();

//Using Bright Data data center proxy
// async function main() {
//   // const oldProxyUrl = 'http://lum-customer-c_71a587f8-zone-zone1:rv8o4uw9ml3o@zproxy.lum-superproxy.io:22225';
//   // const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
//     const browser = await puppeteer.launch({
//       headless: false,
//       args: [
//              '--proxy-server=zproxy.lum-superproxy.io:22225']
//     });
//     const page = await browser.newPage();
//       await page.authenticate({
//           username: 'lum-customer-c_71a587f8-zone-data_center',
//           password: '3nipd3zcmtni'
//       });
//       // await page.goto('https://ipinfo.io/json');
//       // await page.goto('https://whatismyipaddress.com/');
//       // await page.goto('https://www.instagram.com/');
//     // await page.goto('https://www.instagram.com/marianamundov/');
//     await page.goto('https://www.instagram.com/solmorr/');
    
//     // await page.goto('http://lumtest.com/myip.json');
//     // await page.goto('http://luminati.io');

//     await page.screenshot({path: 'example.png'});
//     //   await browser.close();
//   }
  
//   main();




// Using Storm Proxies backconnect rotating proxies (works but definitely not for instagram)
// async function main() {
  
//   // const oldProxyUrl = 'http://cazocdva-rotate:otx45dcea6qk@p.webshare.io:80';
//   // const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
//     const browser = await puppeteer.launch({
//       headless: false,
//       // ignoreHTTPSErrors: true,
//       args: [
        
//         `--proxy-server=5.79.66.2:13010`
//       ],
      

//     });
    
//     const page = await browser.newPage();
      
//       // await page.setExtraHTTPHeaders({
//       //   'Proxy-Authorization': 'Basic ' + Buffer.from('cazocdva-rotate:rotx45dcea6qk').toString('base64'),
//       // });
//       // await page.goto('https://ipinfo.io/json');
//       // await page.goto('https://whatismyipaddress.com/');

//       // await page.goto('https://www.instagram.com/');
//     // await page.goto('https://www.instagram.com/marianamundov/');
//     await page.goto('https://www.tiktok.com/@officialdankhumor?lang=en');
    
//     // await page.goto('http://lumtest.com/myip.json');
//     // await page.goto('http://luminati.io');

//     await page.screenshot({path: 'example.png'});
//     //   await browser.close();
//   }
  
//   main();


// Using Brigth Data web unlocker
async function main() {
  const oldProxyUrl = 'http://lum-customer-c_71a587f8-zone-zone1:rv8o4uw9ml3o@zproxy.lum-superproxy.io:22225';
  const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
    const browser = await puppeteer.launch({
      headless: false,
      args: [
             `--proxy-server=${newProxyUrl}`]
    });
    const page = await browser.newPage();
      await page.authenticate({
          username: 'lum-customer-c_71a587f8-zone-zone1',
          password: 'rv8o4uw9ml3o'
      });
      await page.goto('https://ipinfo.io/json');
      // await page.goto('https://whatismyipaddress.com/');
      // await page.goto('https://www.instagram.com/');
    // await page.goto('https://www.instagram.com/marianamundov/');
    
    // await page.goto('http://lumtest.com/myip.json');
    // await page.goto('http://luminati.io');

    await page.screenshot({path: 'example.png'});
    //   await browser.close();
  }
  
  main();



// Using Webshare free proxies
// async function main() {
  
//   const oldProxyUrl = 'http://cazocdva-rotate:otx45dcea6qk@p.webshare.io:80';
//   const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
//     const browser = await puppeteer.launch({
//       headless: false,
//       // ignoreHTTPSErrors: true,
//       args: [
        
//         `--proxy-server=${newProxyUrl}`
//       ],
      

//     });
    
//     const page = await browser.newPage();
//       await page.authenticate({
//           username: 'cazocdvae',
//           password: 'rotx45dcea6qk'
//       });
//       // await page.setExtraHTTPHeaders({
//       //   'Proxy-Authorization': 'Basic ' + Buffer.from('cazocdva-rotate:rotx45dcea6qk').toString('base64'),
//       // });
//       // await page.goto('https://ipinfo.io/json');
//       // await page.goto('https://whatismyipaddress.com/');

//       await page.goto('https://www.instagram.com/');
//     // await page.goto('https://www.instagram.com/marianamundov/');
    
//     // await page.goto('http://lumtest.com/myip.json');
//     // await page.goto('http://luminati.io');

//     await page.screenshot({path: 'example.png'});
//     //   await browser.close();
//   }
  
//   main();



//Using Bright Data Proxy Manager
//   async function main() {
//     const browser = await puppeteer.launch({
//         headless: false,
//         args: ['--proxy-server=127.0.0.1:24000']
//     });
//     const page = await browser.newPage();
//     await page.authenticate();
//     await page.goto('https://whatismyipaddress.com/');
//     // await page.goto('http://lumtest.com/myip.json');
//     await page.screenshot({path: 'example.png'});
//     // await browser.close();
//   }
  
//   main();

// import puppeteer from 'puppeteer'

// (async () => {
//     const browser = await puppeteer.launch({
//         ignoreHTTPSErrors: true,
//         headless: false,
//         args: [
//             '--proxy-server=http://proxy.crawlera.com:8010'
//         ]
//     });
//     const page = await browser.newPage();

//     await page.setExtraHTTPHeaders({
//         'Proxy-Authorization': 'Basic ' + Buffer.from('fe2c18af31de4272ab144a43d0547c78:').toString('base64'),
//     });
    
//     console.log('Opening page ...');
//     try {
//         await page.goto('https://httpbin.org/get', {timeout: 180000});
//     } catch(err) {
//         console.log(err);
//     }
  
//     console.log('Taking a screenshot ...');
//     await page.screenshot({path: 'screenshot.png'});
//     await browser.close();
// })();