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

        console.log(link_args_array)
        
 
        // Make the appropriate DB calls
        // await  listDatabases(client);
        
        // console.log(influencers)
        // let influencer_video_url = await getInfluencerUrl(influencers)
        // console.log(influencer_video_url)
        // let video_likes = await getVideoLikes(influencer_video_url)
        let influencers = await client.db("campaign_DB").collection('influencers');
        
        // console.log(insta_links_array)
        // console.log(insta_influencers)
        
        await getFollowersFromArray(influencers, client, link_args_array)
        
        
        


 
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

async function getFollowersFromArray(influencers, client, insta_links_array){
    
    for (let i = 0; i < insta_links_array.length; i = i + 1){
        
        let influencer = await influencers.findOne({influencer: insta_links_array[i]})
        let single_video_url = influencer.influencer
        let last_date_updated = ''
        if(influencer.dates_updated.followers_updated == undefined){
            last_date_updated = 'never'
        }
        else{
            last_date_updated = influencer.dates_updated.followers_updated
        }
       

        
        let date = new Date()
        let date_string = date.toString()
        let current_date_string = date_string.substring(4,15)

        
        console.log(last_date_updated)
        if(!last_date_updated.includes(current_date_string)){
            let profile_url_beginning='https://www.instagram.com/'
            
            let profile_username = influencer.username_string
            // console.log(profile_username)
            
            let profile_url = profile_url_beginning + profile_username + '/reels/'
            let influencer_followers = await get_insta_followers(profile_url)
            console.log(influencer_followers)
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: influencer_followers},
            )
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: {'dates_updated.followers_updated' : current_date_string}}
            )
            await sleep(5000);
        }
    }
    console.log('And that\'s the end')
}



const get_insta_followers = async (profile_url) => {
    // open the browser and prepare a page
    const browser = await puppeteer.launch({ headless : false, args: ["--window-size=0,0", "--window-position=1001,0"]  });
    // const browser = await puppeteer.launch({ headless : true});

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0)
    

    await page.goto(profile_url, {waitUntil: 'domcontentloaded'});
    // execute the JS in the context of the page to get all the links
    // Note, for XPath, we need to use the FULL XPATH from Chrome Dev Ops

                            // try_this_xPath = '/html/body/div[1]/section/main/div/div[1]/article/div[3]/section[2]/div/div/a/span'
    await page.waitForXPath('/html/body/div[1]/section/main/div/header/section/ul/li[2]/a/span')
    let followers = await page.$x("/html/body/div[1]/section/main/div/header/section/ul/li[2]/a/span");
    console.log(followers)
    let followers_text = await page.evaluate(element => element.textContent, followers[0]);

    let number = 0
        if(followers_text.includes('k')){
            let regex_no_K = /[^k]*/
            followers_text = followers_text.match(regex_no_K)
            // console.log('views_text after match is ' + views_text)
            // console.log(typeof(likes_string))
            followers_text = String(followers_text)
            // console.log(typeof(likes_string))
            
            // console.log(no_string)
            number = Number(followers_text)
            
            number = number * 1000
            // console.log(number)
            // console.log(likes_string + ' has a K')
        }
        else if(followers_text.includes('m')){
            let regex_no_M = /[^m]*/
            followers_text = followers_text.match(regex_no_M)
            // console.log(typeof(likes_string))
            followers_text = String(followers_text)
            // console.log(typeof(likes_string))
            
            // console.log(no_string)
            number = Number(followers_text)
            number = number * 1000000
            // console.log(likes_string + ' has a K')
        }
        else{
            // console.log(likes_string + ' no K')
            
            number = Number(followers_text)
            // console.log(number)
        }
    
        let followers_object = {num_followers: number}
        // console.log(followers_object)
        
        await browser.close();
        return followers_object
    // // console.log(likes_num)
    // let comments_object = {num_comments: comments_num}
    
    // await browser.close();
    // return comments_object
};

    // get_insta_followers('https://www.instagram.com/solmorr/reels/')
            
            
           
            
            
    
        
        // res.json({ status:"success"})
        
