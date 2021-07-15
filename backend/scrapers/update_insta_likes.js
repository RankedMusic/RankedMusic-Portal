import puppeteer from 'puppeteer'
import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient

// console.log('hello')

// async function main() {
//     // we'll add code here soon
//     const uri = "mongodb+srv://machadorm:rankedthiago@cluster0.mlbwz.mongodb.net/campaign_DB?retryWrites=true&w=majority";

//     const client = new MongoClient(uri);

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

        
 
//         // Make the appropriate DB calls
//         // await  listDatabases(client);
        
//         // console.log(influencers)
//         // let influencer_video_url = await getInfluencerUrl(influencers)
//         // console.log(influencer_video_url)
//         // let video_likes = await getVideoLikes(influencer_video_url)
//         let links_array_object = await client.db("campaign_DB").collection('links_array').findOne({name: 'links_array'});
//         let influencers = await getInfluencersCollection(client)
//         let links_array = links_array_object.links_array
//         // console.log(links_array)
//         // let links_array = await getVideoLinksArray(influencers, client, old_links_array)
//         await getLikesFromArray(influencers, client, links_array)
        
        
        


 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

// main().catch(console.error);

// async function listDatabases(client){
//     let databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// async function getInfluencersCollection(client){
//     let influencers = client.db("campaign_DB").collection('influencers')
//     // console.log(influencers)
//     return influencers
 
// };

async function getLikesFromArray(influencers, client, links_array){
    
    for (let i = 0; i < links_array.length; i = i + 1){
        
        let influencer = await influencers.findOne({influencer: links_array[i]})
        let single_video_url = influencer.influencer
        console.log(single_video_url)
        let video_likes = await getVideoLikes(single_video_url)
        console.log(video_likes)
        await influencers.updateOne(
            { influencer: single_video_url},
            { $set: video_likes},
        )
        await sleep(5000);
    }
}

// async function getInfluencerUrl(influencers){
//     let influencer = await influencers.findOne({ influencer : "https://www.tiktok.com/@javiluna/video/6803783345328213253"});
//     let video_url = influencer.influencer
//     // console.log(video_url)
//     return video_url
 
// };



const get_likes = async (url) => {
    // open the browser and prepare a page
    const browser = await puppeteer.launch({ headless : false, args: ["--window-size=0,0", "--window-position=1001,0"]  });
    // const browser = await puppeteer.launch({ headless : true});

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0)
    

    await page.goto(url, {waitUntil: 'domcontentloaded'});
    // execute the JS in the context of the page to get all the links
    // Note, for XPath, we need to use the FULL XPATH from Chrome Dev Ops


    await page.waitForXPath('/html/body/div[1]/div/div/section/main/div/div[1]/article/div[3]/section[2]/div/div/a/span')
    let likes = await page.$x("/html/body/div[1]/div/div/section/main/div/div[1]/article/div[3]/section[2]/div/div/a/span");
    console.log(likes)
    let likes_text = await page.evaluate(element => element.textContent, likes[0]);
    let like_string = 'Likes: ' + likes_text
    // let like_object = {like_string: like_string}
    
    // await browser.close();
    // return like_object
    };

    get_likes('https://www.instagram.com/reel/CQrgAaPHHs_/')
            
            
           
            
            
    
        
        // res.json({ status:"success"})
        
