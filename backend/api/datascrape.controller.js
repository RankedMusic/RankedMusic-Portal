import puppeteer from 'puppeteer'


export default class ReviewsController {
    static async getVideoLikes(req, res, next) {
        try {
            console.log(req.body.video_url)
            
            const get_likes = async (url) => {
                // open the browser and prepare a page
                const browser = await puppeteer.launch({ headless : false, args: ["--window-size=0,0", "--window-position=1000,0"]  });
                const page = await browser.newPage();
                page.setDefaultNavigationTimeout(0)
                // open the page to scrape
            //   "https://www.tiktok.com/@bbmoods/video/6971426257842064646"
                await page.goto(url, {waitUntil: 'domcontentloaded'});
                // execute the JS in the context of the page to get all the links
                // Note, for XPath, we need to use the FULL XPATH from Chrome Dev Ops
                await page.waitForXPath('/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[5]/div[2]/div[1]/strong')
                let likes = await page.$x("/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[5]/div[2]/div[1]/strong");
                //   console.log(likes)
                let likes_text = await page.evaluate(element => element.textContent, likes[0]);
                let like_string = 'Likes: ' + likes_text
                let like_object = {like_string: like_string}
                //   console.log(like_object)
                await browser.close();
                return like_object
                };
                
                (async () => {
                    //Run async functions and console.log the results
                    let likes_object = await get_likes(req.body.video_url)
                    // console.log(likes_object)
                    res.json(likes_object)

                    // console.log(await scraper.get_num_comments("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                    // console.log(await scraper.get_shares("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                        // console.log(await scraper.get_views("https://vm.tiktok.com/ZMepr2F1s/"))
                })()
        
            
            // res.json({ status:"success"})
            } catch (e) {
                res.status(500).json({error:e.message})
            }
    }

    static async getVideoComments(req, res, next) {
        try {
            console.log(req.body.video_url)
            
            const get_likes = async (url) => {
                // open the browser and prepare a page
                const browser = await puppeteer.launch({ headless : false , args: ["--window-size=0,0", "--window-position=1000,0"] });
                const page = await browser.newPage();
                page.setDefaultNavigationTimeout(0)
                // open the page to scrape
            //   "https://www.tiktok.com/@bbmoods/video/6971426257842064646"
                await page.goto(url, {waitUntil: 'domcontentloaded'});
                // execute the JS in the context of the page to get all the links
                // Note, for XPath, we need to use the FULL XPATH from Chrome Dev Ops
                await page.waitForXPath('/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[5]/div[2]/div[2]/strong')
                let comments = await page.$x("/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[5]/div[2]/div[2]/strong");
                //   console.log(likes)
                let comment_text = await page.evaluate(element => element.textContent, comments[0]);
                let comment_string = 'Comments: ' + comment_text
                let comment_object = {comment_string: comment_string}
                //   console.log(like_object)
                await browser.close();
                return comment_object
                };
                
                (async () => {
                    //Run async functions and console.log the results
                    let comments_object = await get_likes(req.body.video_url)
                    // console.log(comments_object)
                    res.json(comments_object)

                    // console.log(await scraper.get_num_comments("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                    // console.log(await scraper.get_shares("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                        // console.log(await scraper.get_views("https://vm.tiktok.com/ZMepr2F1s/"))
                })()
        
            
            // res.json({ status:"success"})
            } catch (e) {
                res.status(500).json({error:e.message})
            }
    }

    static async getInfluencerUsername(req, res, next) {
        try {
            // console.log('The url should be ' + req.body.influencer)
            
            const get_influencer_username = async (url) => {
    
                // open the browser and prepare a page
                const browser = await puppeteer.launch({ headless : false , args: ["--window-size=0,0", "--window-position=1000,0"] });
                
                const page = await browser.newPage();
                page.setDefaultNavigationTimeout(0)
                
                // open the page to scrape
              //   "https://www.tiktok.com/@bbmoods/video/6971426257842064646"
                await page.goto(url, {waitUntil: 'domcontentloaded'});
              
                // execute the JS in the context of the page to get all the links
                // Note, for XPath, we need to use the FULL XPATH from Chrome Dev Ops
              
                  await page.waitForXPath('/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[1]/a[1]/h3')
                  let username = await page.$x("/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[1]/a[1]/h3");
                  let username_text = await page.evaluate(element => element.textContent, username[0]);
                  let username_string = 'Influencer username: ' + username_text
                  let username_object = {username_string: username_string}
                  await browser.close();
                  return username_object

                  await browser.close();
                  await page.waitFor( 1000 );
              };
            
                
                (async () => {
                    //Run async functions and console.log the results
                    let username_object = await get_influencer_username(req.body.influencer)
                    // console.log(username_object)
                    
                    res.json(username_object)

                    // console.log(await scraper.get_num_comments("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                    // console.log(await scraper.get_shares("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                        // console.log(await scraper.get_views("https://vm.tiktok.com/ZMepr2F1s/"))
                })()
        
            
            // res.json({ status:"success"})
            } catch (e) {
                res.status(500).json({error:e.message})
            }
    }


    static async getInfluencerAvatar(req, res, next) {
        try {
            // console.log(req.body.influencer)
            
            const get_influencer_avatar = async (url) => {
    
                // open the browser and prepare a page
                const browser = await puppeteer.launch({ headless : false , args: ["--window-size=0,0", "--window-position=1000,0"] });
                const page = await browser.newPage();
                page.setDefaultNavigationTimeout(0)
                await page.goto(url, {waitUntil: 'domcontentloaded'});
                await page.waitForXPath('/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/a/span/img')
                await page.evaluate(() => document.querySelector('#main > div.jsx-3867589354.main-body.page-with-header.middle.em-follow > div.jsx-523345860.video-detail.video-detail-v4.middle > div > div > main > div > div.jsx-1860510881.video-feed-container > span:nth-child(1) > div > a > span > img').setAttribute('class', 'avatar'));  
                const avatar_src = await page.$$eval('img.avatar[src]', imgs => imgs.map(img => img.getAttribute('src')));
            
                let avatar_string = 'The avatar src is ' + avatar_src
                await browser.close();
                let avatar_object = {src: avatar_src}
                return avatar_object
            
                  // await browser.close();
              
                  await page.waitFor( 1000 );
              };
                
                (async () => {
                    //Run async functions and console.log the results
                    let avatar_obj = await get_influencer_avatar(req.body.influencer)
                    // console.log(comments_object)
                    res.json(avatar_obj)

                    // console.log(await scraper.get_num_comments("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                    // console.log(await scraper.get_shares("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                        // console.log(await scraper.get_views("https://vm.tiktok.com/ZMepr2F1s/"))
                })()
        
            
            // res.json({ status:"success"})
            } catch (e) {
                res.status(500).json({error:e.message})
            }
    }
}