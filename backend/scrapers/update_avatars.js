import puppeteer from 'puppeteer'
import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient

// console.log('hello')
// This script updates the avatar src in our code. Will ignore influencers that already have an avatar_src in MongoDB
async function main() {
    // we'll add code here soon
    const uri = "mongodb+srv://machadorm:rankedthiago@cluster0.mlbwz.mongodb.net/campaign_DB?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        
 
        // Make the appropriate DB calls
        // await  listDatabases(client);
        
        // console.log(influencers)
        // let influencer_video_url = await getInfluencerUrl(influencers)
        // console.log(influencer_video_url)
        // let video_likes = await getVideoLikes(influencer_video_url)
        let links_array_object = await client.db("campaign_DB").collection('links_array').findOne({name: 'links_array'});
        let influencers = await getInfluencersCollection(client)
        let links_array = links_array_object.links_array
        // console.log(links_array)
        // let links_array = await getVideoLinksArray(influencers, client, old_links_array)
        // await getUsernamesFromArray(influencers, client, links_array)
        await getAvatarsFromArray(influencers, client, links_array)

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

async function getAvatarsFromArray(influencers, client, links_array){
    
    for (let i = 0; i < links_array.length; i = i + 1){
        
        let influencer = await influencers.findOne({influencer: links_array[i]})
        let single_video_url = influencer.influencer
        console.log(single_video_url)
        
        
          
            let avatar_src = await getInfluencerAvatar(single_video_url)
            console.log(avatar_src)
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: avatar_src},
            )
            await sleep(5000);
        
        
    }
}

async function getInfluencerAvatar(url) {
    try{
        const get_influencer_avatar = async (url) => {

            // open the browser and prepare a page
            const browser = await puppeteer.launch({ headless : false });
            
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(0)
            await page.goto(url, {waitUntil: 'domcontentloaded'});
            await page.waitForXPath('/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/a/span/img')
            await page.evaluate(() => document.querySelector('#main > div.jsx-3867589354.main-body.page-with-header.middle.em-follow > div.jsx-523345860.video-detail.video-detail-v4.middle > div > div > main > div > div.jsx-1860510881.video-feed-container > span:nth-child(1) > div > a > span > img').setAttribute('class', 'avatar'));  
            const avatar_src = await page.$$eval('img.avatar[src]', imgs => imgs.map(img => img.getAttribute('src')));
            let avatar_src_string = avatar_src[0]
            let avatar_object = {avatar_src: avatar_src_string}
        

            await browser.close();
            return avatar_object
            }
                    
                    
                    const avatar_function = async () => {
                        //Run async functions and console.log the results
                        let avatar_object = await get_influencer_avatar(url)
                        // console.log(avatar_object)
                        return(avatar_object)
                    }

                    
                    let avatar_object = await avatar_function()
                    return(avatar_object)

            
        } catch (e) {
            res.status(500).json({error:e.message})
        }
}