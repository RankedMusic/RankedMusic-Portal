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
        let cl_args_array = process.argv
        // console.log(cl_args_array)
        let link_args_array = []
        
        for(let i = 0; i < cl_args_array.length; i = i + 1){
            // console.log(i)
            if(i > 1){
                link_args_array.push(cl_args_array[i])
            }
        }

        console.log(link_args_array)

        
 
        // Make the appropriate DB calls
        // await  listDatabases(client);
        
        // console.log(influencers)
        // let influencer_video_url = await getInfluencerUrl(influencers)
        // console.log(influencer_video_url)
        // let video_likes = await getVideoLikes(influencer_video_url)
        let links_array_object = await client.db("campaign_DB").collection('links_array').findOne({name: 'links_array'});
        let influencers = await getInfluencersCollection(client)
        
        // console.log(links_array)
       

        // Function call where we are actually grabbing likes and putting them into MongoDB
        await getLikesFromArray(influencers, client, link_args_array)
        
        
        


 
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

// async function listDatabases(client){
//     let databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

async function getInfluencersCollection(client){
    let influencers = client.db("campaign_DB").collection('influencers')
    // console.log(influencers)
    return influencers
 
};

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

async function getVideoLikes(url) {

        const get_likes = async (url) => {
            // open the browser and prepare a page
            const browser = await puppeteer.launch({ headless : false, args: ["--window-size=0,0", "--window-position=1001,0"]  });
            // const browser = await puppeteer.launch({ headless : true});

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
            let number = 0
        if(likes_text.includes('K')){
            let regex_no_K = /[^K]*/
            likes_text = likes_text.match(regex_no_K)
            likes_text = String(likes_text)
            number = Number(likes_text)
            number = number * 1000
           
        }
        else if(likes_text.includes('M')){
            let regex_no_K = /[^M]*/
            likes_text = likes_text.match(regex_no_K)
            likes_text = String(likes_text)

            number = Number(likes_text)
            number = number * 1000000

        }
        else{
            number = Number(likes_text)
        }
       
        let likes_object = {num_likes: number}
        console.log(likes_object)

        
            //   console.log(like_object)
            await browser.close();
            return likes_object
            };
            
            
            const likes_function = async () => {
                //Run async functions and console.log the results
                let likes_object = await get_likes(url)
                // console.log(likes_object)
                return(likes_object)

                // console.log(await scraper.get_num_comments("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                // console.log(await scraper.get_shares("https://www.tiktok.com/@tuckercomedy/video/6971234748236647685"))
                    // console.log(await scraper.get_views("https://vm.tiktok.com/ZMepr2F1s/"))
            }
            let likes_object = await likes_function()
            return(likes_object)
            
            
    
        
        // res.json({ status:"success"})
        
}