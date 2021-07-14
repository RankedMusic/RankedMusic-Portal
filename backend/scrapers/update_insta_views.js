// Run this file to update instagram reels views
import puppeteer from 'puppeteer'
// const { chromium } = require('playwright')
import CaptchaSolver from 'tiktok-captcha-solver'

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
//         let insta_links_array_object = await client.db("campaign_DB").collection('insta_links_array').findOne({name: 'insta_links_array'});
//         let insta_influencers = await client.db("campaign_DB").collection('insta_influencers');
//         let insta_links_array = insta_links_array_object.insta_links_array
//         console.log(insta_links_array)
//         console.log(insta_influencers)
        
//         await getViewsFromArray(insta_influencers, client, links_array)

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
// main().catch(console.error);

const get_insta_views = async (video_url, profile_url) => {

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--auto-open-devtools-for-tabs' ]
    });
    const page = await browser.newPage();
    await page.goto(profile_url, {
        waitUntil: 'networkidle0', waitUntil: 'domcontentloaded'
      });
    await page.setViewport({
        width: 1200,
        height: 800
    });
    
    await page.waitForTimeout(5000);
    await autoScroll(page)

    let xPath = await getXPath(page, video_url)

    
    //NOTE: These xpaths don't work because elements change when we open devtools
    //      had to use args in the puppeteer launch in order to find the correct xpath... See below
    // let xpath_1st_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[1]/div[1]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // let xpath_7th_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[3]/div[1]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // let xpath_5th_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[2]/div[2]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // let xpath_9th_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[3]/div[3]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // let gen_xpath_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[row_num]/div[col_num]/div/a/div[2]/div[2]/div/div/div/div[2]/span'

    let work_xpath_7v = '/html/body/div[1]/section/main/div/div[3]/div/div/div/div[2]/div[3]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    let gen_work_xpat = '/html/body/div[1]/section/main/div/div[3]/div/div/div/div[row_num]/div[col_num]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // await page.waitForXPath(args_xpath_7v)

    let views = await page.$x(args_xpath_7v);
    let views_text = await page.evaluate(element => element.textContent, views[0]);
    console.log(views_text)
}

get_insta_views('https://www.instagram.com/reel/CQrgAaPHHs_/', 'https://www.instagram.com/solmorr/reels/')

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 250;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
        return(true)
    });
}

const getXPath = async(page, video_url) => {

    // NOTE: set reel_counter to -1 because we have two false links in the beginning of href array
    let reel_counter = 1
    let reels_array = []

    
    const hrefs = await page.$$eval('a', as => as.map(a => a.href));
    // console.log(hrefs)
    for (let i = 0; i < hrefs.length; i = i + 1){
        if(hrefs[i].includes('/reel/')){
            reels_array.push(hrefs[i])
        }

    }
    console.log(reels_array)
    let found_vid = false
    let vid_counter = 0
    let vid_num = 0
    for(let i = 0; i < reels_array.length; i = i + 1){ 
        if(reels_array[i].includes(video_url) && found_vid == false){
            found_vid = true
            vid_counter = vid_counter + 1
            // vid_num = vid_counter

        }
        if(!reels_array[i].includes(video_url) && found_vid == false){
            vid_counter = vid_counter + 1
        }
        if(found_vid == true){
            vid_num = vid_counter
        }
    }
    console.log('The video number is ' + vid_num)

    //row number is vid_num floor divided by 3 (maybe 4???) and then +1
    // Column number is vid_num mod 3 (MAYBE 4 INSTEAD OF 3?!) - i.e. take the remainer of vid_num divided by 3 (IDK IF ITS 4)
    // NOTE: For column number... sometimes vid_num % 3 = 0. In that case we set col_num = 3
    
    // let row_num = Math.floor(vid_num/3) + 1 
    // let col_num = vid_num % 3
    // if(col_num == 0){
    //     col_num = 3
    // }

    let row_num = Math.floor(vid_num/4) + 1 
    let col_num = vid_num % 4
    if(col_num == 0){
        col_num = 4
    }
    console.log('The roe number is ' + row_num)
    console.log('The col number is ' + col_num)


    


}
