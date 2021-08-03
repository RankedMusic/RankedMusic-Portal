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
        let link_args_array = []
        
        for(let i = 0; i < cl_args_array.length; i = i + 1){
            // console.log(i)
            if(i > 1){
                link_args_array.push(cl_args_array[i])
            }
        }
        let influencers = await client.db("campaign_DB").collection('influencers');
        console.log(link_args_array)

        

      
       
        
        // console.log(insta_links_array)
        // console.log(insta_influencers)
        
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

async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function getInfluencersCollection(client){
    let influencers = client.db("campaign_DB").collection('influencers')
    // console.log(influencers)
    return influencers
 
};

async function getLikesFromArray(influencers, client, insta_links_array){
    
    for (let i = 0; i < insta_links_array.length; i = i + 1){
        
        let influencer = await influencers.findOne({influencer: insta_links_array[i]})
        let single_video_url = influencer.influencer

        let date = new Date()
        let date_string = date.toString()
        let current_date_string = date_string.substring(4,15)

        let last_date_updated = ''
        if(influencer.dates_updated.likes_updated == undefined){
            last_date_updated = 'never'
        }
        else{
            last_date_updated = influencer.dates_updated.likes_updated
            
        }

        console.log(last_date_updated)
        if(!last_date_updated.includes(current_date_string)){
            console.log(single_video_url)
            let video_likes = await get_likes(single_video_url)
            console.log(video_likes)
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: video_likes},
            )
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: {'dates_updated.likes_updated' : current_date_string}}
            )
            await sleep(5000);
        }
    }
    console.log('And that\'s the end')
}



const get_likes = async (url) => {
    // open the browser and prepare a page
    const browser = await puppeteer.launch({ headless : false, args: ["--window-size=0,0", "--window-position=1001,0"]  });
    // const browser = await puppeteer.launch({ headless : true});

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0)
    

    await page.goto(url, {waitUntil: 'domcontentloaded'});
    // execute the JS in the context of the page to get all the links
    // Note, for XPath, we need to use the FULL XPATH from Chrome Dev Ops

                            // try_this_xPath = '/html/body/div[1]/section/main/div/div[1]/article/div[3]/section[2]/div/div/a/span'
    await page.waitForXPath('/html/body/div[1]/section/main/div/div[1]/article/div[3]/section[2]/div/div/a/span')
    let likes = await page.$x("/html/body/div[1]/section/main/div/div[1]/article/div[3]/section[2]/div/div/a/span");
    // console.log(likes)
    let likes_text = await page.evaluate(element => element.textContent, likes[0]);
    
    let likes_num = parseFloat(likes_text.replace(/,/g, ''));
    // console.log(likes_num)
    let like_object = {num_likes: likes_num}
    
    await browser.close();
    return like_object
};

    // get_likes('https://www.instagram.com/reel/CQrgAaPHHs_/')
            
            
           
            
            
    
        
        // res.json({ status:"success"})
        
