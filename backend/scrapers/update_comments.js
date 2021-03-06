import puppeteer from 'puppeteer'
import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient

// console.log('hello')

async function main() {
    // we'll add code here soon
    const uri = "mongodb+srv://machadorm:rankedthiago@cluster0.mlbwz.mongodb.net/campaign_DB?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        let links_array_object = await client.db("campaign_DB").collection('links_array').findOne({name: 'links_array'});
        let influencers = await getInfluencersCollection(client)
        let links_array = links_array_object.links_array
        // console.log(links_array)
        // let links_array = await getVideoLinksArray(influencers, client, old_links_array)
        await getCommentsFromArray(influencers, client, links_array) 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

main().catch(console.error);

async function getInfluencersCollection(client){
    let influencers = client.db("campaign_DB").collection('influencers')
    // console.log(influencers)
    return influencers
 
};

async function getCommentsFromArray(influencers, client, links_array){
    
    for (let i = 0; i < links_array.length; i = i + 1){
        
        let influencer = await influencers.findOne({influencer: links_array[i]})
        let single_video_url = influencer.influencer
        let last_date_updated = ''
        if(influencer.dates_updated.comments_updated == undefined){
            last_date_updated = 'never'
        }
        else{
            last_date_updated = influencer.dates_updated.comments_updated
        }
       

        
        let date = new Date()
        let date_string = date.toString()
        let current_date_string = date_string.substring(4,15)

        
        console.log(last_date_updated)
        if(!last_date_updated.includes(current_date_string)){
            console.log(single_video_url)
            let video_comments = await getVideoComments(single_video_url)
            console.log(video_comments)
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: video_comments},
            )
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: {'dates_updated.comments_updated' : current_date_string}}
            )
            await sleep(5000);
        }
}
console.log('And that\'s the end')

}



async function getVideoComments(url) {
    try {
        
        
        const get_comments = async (url) => {
            // open the browser and prepare a page
            const browser = await puppeteer.launch({ headless : false, args: ["--window-size=0,0", "--window-position=1001,0"]  });
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(0)
            // open the page to scrape
        //   "https://www.tiktok.com/@bbmoods/video/6971426257842064646"
            await page.goto(url, {waitUntil: 'domcontentloaded'});
            // execute the JS in the context of the page to get all the links
            // Note, for XPath, we need to use the FULL XPATH from Chrome Dev Ops
            await page.waitForXPath('/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[5]/div[2]/div[2]/strong')
            let comments = await page.$x('/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[5]/div[2]/div[2]/strong');
            //   console.log(likes)
            let comments_text = await page.evaluate(element => element.textContent, comments[0]);
            let number = 0

        if(comments_text.includes('K')){
            let regex_no_K = /[^K]*/
            comments_text = comments_text.match(regex_no_K)
            comments_text = String(comments_text)
            number = Number(comments_text)
            number = number * 1000
            
        }
        else if(comments_text.includes('M')){
            let regex_no_K = /[^M]*/
            comments_text = comments_text.match(regex_no_K)
            comments_text = String(comments_text)

            number = Number(comments_text)
            number = number * 1000000

        }
        else{
            number = Number(comments_text)
        }
       
        let comments_object = {num_comments: number}
        console.log(comments_object)

        
            //   console.log(like_object)
        
            await browser.close();
            return comments_object
            };
            


            
            const comment_function = async () => {
                //Run async functions and console.log the results
                let comment_object = await get_comments(url)
                // console.log(comment_object)
                return(comment_object)

                // console.log(await scraper.get_num_comments("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                // console.log(await scraper.get_shares("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                    // console.log(await scraper.get_views("https://vm.tiktok.com/ZMepr2F1s/"))
            }
            let comment_object = await comment_function()
            return(comment_object)
            
            
    
        
        // res.json({ status:"success"})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
}