import puppeteer from 'puppeteer'
// const { chromium } = require('playwright')
import CaptchaSolver from 'tiktok-captcha-solver'

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
        // await getUsernamesFromArray(influencers, client, links_array)
        await getFollowersFromArray(influencers, client, links_array)

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

async function getFollowersFromArray(influencers, client, links_array){
    
    for (let i = 0; i < links_array.length; i = i + 1){
        
        let influencer = await influencers.findOne({influencer: links_array[i]})
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

            let profile_url_beginning='https://www.tiktok.com/@'
            
            let profile_username = influencer.username_string
            // console.log(profile_username)
           
            let profile_url = profile_url_beginning + profile_username
            // console.log(profile_url)
            
            // console.log(single_video_url)
            let followers_object = await get_tt_followers(profile_url)
            
        
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: followers_object}
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

const get_tt_followers = async (profile_url) => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(profile_url, {
        waitUntil: 'networkidle0', waitUntil: 'domcontentloaded'
      });
    await page.setViewport({
        width: 1200,
        height: 800
    });

    await page.waitForXPath('/html/body/div[1]/div/div[2]/div[2]/div/header/h2[1]/div[2]/strong');


    let followers = await page.$x('/html/body/div[1]/div/div[2]/div[2]/div/header/h2[1]/div[2]/strong');
    console.log(followers)

    if(followers.length == 0){
        console.log('try again')
        return null
    }
    else{
        let followers_text = await page.evaluate(element => element.textContent, followers[0]);
        console.log(followers_text)
        // console.log(typeof(views_text))

        //This next part is for storing the views as a number, rather than as a string like before
        
        let number = 0
        if(followers_text.includes('K')){
            let regex_no_K = /[^K]*/
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
        else if(followers_text.includes('M')){
            let regex_no_M = /[^M]*/
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
        
        // console.log('influencer_likes regex test is ' + number)
        // console.log(typeof(number))
        
        
        let followers_object = {num_followers: number}
        console.log(followers_object)
        
        await browser.close();
        return followers_object
    }

};


