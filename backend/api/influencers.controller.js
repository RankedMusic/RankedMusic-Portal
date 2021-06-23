import InfluencersDAO from "../dao/influencersDAO.js"
// import DataScrapeCtrl from "./datascrape.controller"

export default class InfluencersController {
    static async apiPostInfluencer(req, res, next) {
        try {
            console.log(req.body)
            // get info from body of request
            const campaignId = req.body.campaign_id
            // console.log(req.body.campaign_id)
            const influencer = req.body.influencer
            const date = new Date()
            const influencer_username = req.body.influencer_user.username_string
            const avatar_src = req.body.avatar.src[0] //NOTE CHANGE COMMENT_STRING TO AVATR STRING
            console.log('The avatar src is '+ avatar_src)
            // const userInfo = {
            //     name: req.body.name,
            //     _id: req.body.user_id
            // }
            // get new date
            // put data tg and send over to to db
            
            // console.log(username)
            const InfluencerResponse = await InfluencersDAO.addInfluencer(
                campaignId,
                influencer,
                date,
                influencer_username,
                avatar_src
            )
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }
    // method that gets info from body, send over to db
    static async apiUpdateInfluencer(req, res, next) {
        try {
            const influencerId = req.body.influencer_id
            const text = req.body.text
            const date = new Date()
            // get user id bc making sure user who created influencer is updating influencer
            const influencerResponse = await InfluencersDAO.updateInfluencer(
                influencerId,
                req.body.user_id,
                text,
                date,
            )

            var{error} = influencerResponse
            if (error) {
                res.status(400).json({error})
            }
            // if mod count = 0 -> not updated and throw error
            if (influencerResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to influencer - user may not be original poster",
                )
            }
                res.json({ status: "success"})
            } catch (e) {
                res.status(500).json({error:e.message})
            }
        }
        static async apiDeleteInfluencer(req, res, next) {
            try {
                // have a query  parameter instead of a body
                const influencerId = req.query.id
                // checking the user who created is the one deleting before deleting
                const userId = req.body.user_id
                console.log(influencerId)
                // call delete influencer and send over influencer and user id
                const influencerResponse = await InfluencersDAO.deleteInfluencer(
                    influencerId,
                    userId,
                )
                res.json({ status:"success"})
            } catch (e) {
                res.status(500).json({error:e.message})
        }

    }

     async getInfluencerUsername(req, res, next) {
        try {
            console.log('The url should be ' + req.body.influencer)
            
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
                  let username_string = 'The influencer is ' + username_text
                  let username_object = {username_string: username_string}
                  await browser.close();
                  return username_object

                  await browser.close();
                  await page.waitFor( 1000 );
              };
            
                
                (async () => {
                    //Run async functions and console.log the results
                    let username_object = await get_influencer_username(req.body.influencer)
                    console.log(username_object)
                    
                    // res.json(username_object)

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
                    console.log(comments_object)
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

}