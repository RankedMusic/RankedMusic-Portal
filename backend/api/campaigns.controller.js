import CampaignsDAO from "../dao/campaignsDAO.js"

export default class CampaignsController {
    // when this api is called thru URL -> can be a query string
    // sets Rest.PP variable to equal whatever the query is in the url
    
    static async PostCampaign(req, res, next) {
        try {
            // get info from body of request
            const name = req.body.name
            const genre = req.body.genre
            const id = req.body.id
            const platform = req.body.platform
            const accountExec = req.body.accountExec
            const campManager = req.body.campManager
            const clientContact = req.body.clientContact
            const artist = req.body.artist
            const song = req.body.song
            const songLink = req.body.songLink
            // get new date
            // put data tg and send over to to db
            const CampaignResponse = await CampaignsDAO.addCampaign(
                name,
                genre,
                id,
                platform,
                accountExec,
                campManager,
                clientContact,
                artist,
                song,
                songLink
            )
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }
    
    
    
    
    
    static async apiGetCampaigns(req, res, next) {
        // convert value to int -> otherwise default = 20
        const campaignsPerPage = req.query.campaignsPerPage ? parseInt(req.query.campaignsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.genre) {
            filters.genre = req.query.genre
        } 
        // else if (req.query.zipcode) {
        //     filters.zipcode = req.query.zipcode
        // }
        else if (req.query.name) {
            filters.name = req.query.name
        }
    
        const { campaignsList, totalNumCampaigns } = await CampaignsDAO.getCampaigns({
            filters,
            page,
            campaignsPerPage
        })

        let response = { 
            campaigns: campaignsList,
            page: page,
            filters: filters,
            entries_per_page: campaignsPerPage,
            total_results: totalNumCampaigns,
        }
        res.json(response)
    }
    static async apiGetCampaignById(req, res, next) {
        try {
            // look for id parameter -> call get campaigns by id -> get campaign back
            let id = req.params.id || {}
            let campaign = await CampaignsDAO.getCampaignsByID(id)
            console.log(campaign)
            if (!campaign){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(campaign)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }

    static async apiGetCampaignGenre(req, res, next) {
        try{
            let genre = await CampaignsDAO.getGenre()
            res.json(genre)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }

    static async getVideoLikes(req, res, next) {
        try {
            console.log(req.body.video_url)
            
            const get_likes = async (url) => {
                // open the browser and prepare a page
                const browser = await puppeteer.launch({ headless : false });
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
                    console.log(likes_object)
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
                const browser = await puppeteer.launch({ headless : false });
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