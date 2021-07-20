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
        await getUsernamesFromArray(influencers, client, links_array)
        // await getAvatarsFromArray(influencers, client, links_array)
        
        
        


 
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

async function getUsernamesFromArray(influencers, client, links_array){
    
    for (let i = 0; i < links_array.length; i = i + 1){
        
        let influencer = await influencers.findOne({influencer: links_array[i]})
        let single_video_url = influencer.influencer
        // console.log(single_video_url)
        let stored_influencer_username = influencer.username_string
        console.log('The influencer username before scraping is ' + stored_influencer_username)
        if(stored_influencer_username == null){
            console.log('We dont have the username yet!')
            let influencer_username = await getInfluencerUsername(single_video_url)
            // console.log('The influencer username is ' + influencer_username.username_string)
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: influencer_username},
            )
            await sleep(5000);
        }
    }
}

async function getInfluencerUsername(url) {
    try {
        
        
        const get_username = async (url) => {
            // open the browser and prepare a page
            const browser = await puppeteer.launch({ headless : false, args: ["--window-size=0,0", "--window-position=1001,0"]  });
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(0)
            // open the page to scrape
        //   "https://www.tiktok.com/@bbmoods/video/6971426257842064646"
            await page.goto(url, {waitUntil: 'domcontentloaded'});
            // execute the JS in the context of the page to get all the links
            // Note, for XPath, we need to use the FULL XPATH from Chrome Dev Ops
            await page.waitForXPath('/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[1]/a[1]/h3')
            let username = await page.$x('/html/body/div/div/div[2]/div[2]/div/div/main/div/div[1]/span[1]/div/div[1]/div[1]/a[1]/h3');
            //   console.log(likes)
            let username_text = await page.evaluate(element => element.textContent, username[0]);
            let username_string = username_text
            let username_object = {username_string: username_string}
            //   console.log(like_object)
            await browser.close();
            return username_object
            };
            
            
            const username_function = async () => {
                //Run async functions and console.log the results
                let username_object = await get_username(url)
                // console.log(comment_object)
                return(username_object)

            }
            let username_object = await username_function()
            return(username_object)

        } catch (e) {
            console.log(e)
        }
}

// async function getAvatarsFromArray(influencers, client, links_array){
    
//     for (let i = 0; i < links_array.length; i = i + 1){
        
//         let influencer = await influencers.findOne({influencer: links_array[i]})
//         let single_video_url = influencer.influencer
//         console.log(single_video_url)
//         let video_comments = await getInfluencerAvatar(single_video_url)
//         console.log(video_comments)
//         await influencers.updateOne(
//             { influencer: single_video_url},
//             { $set: video_comments},
//         )
//         await sleep(5000);
//     }
// }