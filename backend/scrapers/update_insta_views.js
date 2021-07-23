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
//         let influencers = await client.db("campaign_DB").collection('influencers');
//         let insta_links_array = insta_links_array_object.insta_links_array
//         // console.log(insta_links_array)
//         // console.log(insta_influencers)
        
//         await getViewsFromArray(influencers, client, insta_links_array)

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
// main().catch(console.error);


// const getViewsFromArray = async (influencers, client, insta_links_array) => {
//     for(let i = 0; i < insta_links_array.length; i = i + 1){
        
//         let influencer = await influencers.findOne({influencer: insta_links_array[i]})
//         let single_vid_link = insta_links_array[i]
//         let profile_url_beginning='https://www.instagram.com/'
        
//         let profile_username = influencer.username_string
//         // console.log(profile_username)
        
//         let profile_url = profile_url_beginning + profile_username
//         console.log(single_vid_link)
//         console.log(profile_url)
//         let views_object = await get_insta_views(single_vid_link, profile_url)

//         if(views_object != null){
//             let date = new Date()
//             let date_string = date.toString()
//             let final_date = date_string.substring(4,15)
//             let date_updated_string = 'Views Updated ' + final_date
//             let date_updated_views_object = {date_views_updated: date_updated_string}
//             console.log('The video ' + single_vid_link + ' has ' + views_object.views_num) 
//             console.log(views_object)
//             await influencers.updateOne(
//                 { influencer: single_vid_link},
//                 { $set: views_object}
//             )

//             await influencers.updateOne(
//                 { influencer: single_vid_link},
//                 { $set: date_updated_views_object}
//             )
//             await sleep(10000);
//         }
//         else{

//             console.log('We did not get views for the video ' + single_vid_link)
//             console.log('Most likely because element is not found')
//             console.log('Recheck XPath on chromium')
//             console.log('')
//         }

//     }

// }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const get_insta_views = async (video_url, profile_url) => {

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
    let iteration_counter = 1
    await page.waitForTimeout(2000);
    await page.$x('/html/body/div[1]/section/main/div/div[2]/a[2]/div/span');
    let reels = await page.$x('/html/body/div[1]/section/main/div/div[2]/a[2]/div/span');
    console.log(reels)
    if (reels[0] == null){
        await page.waitForTimeout(2000);
        page.waitForXPath('/html/body/div[1]/section/main/div/div[1]/a[2]/div/span')
        reels = await page.$x('/html/body/div[1]/section/main/div/div[1]/a[2]/div/span');
        iteration_counter = 2
        console.log("reels 2", reels);
        if (reels[0] == null){
            await page.waitForTimeout(2000);
            page.waitForXPath('/html/body/div[1]/section/main/div/div[1]/a[2]')
            reels = await page.$x('/html/body/div[1]/section/main/div/div[1]/a[2]'); 
            console.log("reels 3", reels);
            iteration_counter = 3
        }
    }

    await reels[0].click();

    // await page.waitForTimeout(2000);
    await page.waitForTimeout(5000);
    await autoScroll(page)

    let fullXPath = await getXPath(page, video_url, iteration_counter)

    
    //NOTE: These xpaths don't work because elements change when we open devtools
    //      had to use args in the puppeteer launch in order to find the correct xpath... See below
    // let xpath_1st_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[1]/div[1]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // let xpath_7th_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[3]/div[1]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // let xpath_5th_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[2]/div[2]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // let xpath_9th_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[3]/div[3]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // let gen_xpath_vid = '/html/body/div[1]/section/main/div/div[4]/div/div/div/div[row_num]/div[col_num]/div/a/div[2]/div[2]/div/div/div/div[2]/span'

    let work_xpath_7v = '/html/body/div[1]/section/main/div/div[3]/div/div/div/div[2]/div[3]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    let gen_work_xpat = '/html/body/div[1]/section/main/div/div[3]/div/div/div/div[row_num]/div[col_num]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
    // console.log('The full x path is ' + fullXPath)
    // await page.waitForXPath(args_xpath_7v)

    let views = await page.$x(fullXPath);
    if(views.length == 0){
        console.log('try again')
        return null
    }
    else{
        let views_text = await page.evaluate(element => element.textContent, views[0]);
        console.log(views_text)
        let number = 0
        if(views_text.includes('k')){
            let regex_no_K = /[^k]*/
            views_text = views_text.match(regex_no_K)
            // console.log('views_text after match is ' + views_text)
            // console.log(typeof(likes_string))
            views_text = String(views_text)
            // console.log(typeof(likes_string))
            
            // console.log(no_string)
            number = Number(views_text)
            
            number = number * 1000
            // console.log(number)
            // console.log(likes_string + ' has a K')
        }
        else if(views_text.includes('m')){
            let regex_no_K = /[^m]*/
            views_text = views_text.match(regex_no_K)
            // console.log(typeof(likes_string))
            views_text = String(views_text)
            // console.log(typeof(likes_string))
            
            // console.log(no_string)
            number = Number(views_text)
            number = number * 1000000
            // console.log(likes_string + ' has a K')
        }
        else{
            // console.log(likes_string + ' no K')
            
            number = Number(views_text)
            // console.log(number)
        }
        
        // console.log('influencer_likes regex test is ' + number)
        // console.log(typeof(number))
        
        
        let views_object = {views_num: number}
        console.log(views_object)
        
        await browser.close();
        return views_object
    }
    
}

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

const getXPath = async(page, video_url, iteration_counter) => {

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
    // console.log('The video number is ' + vid_num)

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

    //Case where we have four tabs
    if(iteration_counter == 1){
        let fullXPath = '/html/body/div[1]/section/main/div/div[3]/div/div/div/div[' + row_num +']/div['+col_num+']/div/a/div[2]/div[2]/div/div/div/div[2]/span'
        return fullXPath
    }
    //Case where we have three tabs
    else if(iteration_counter == 2){
        // let sample_XPath_11th_vid = '/html/body/div[1]/section/main/div/div[2]/div/div/div/div[3]/div[3]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
        // let sample_XPath_15th_vid = '/html/body/div[1]/section/main/div/div[2]/div/div/div/div[4]/div[3]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
        // let sample_XPath_16th_vid = '/html/body/div[1]/section/main/div/div[2]/div/div/div/div[4]/div[4]/div/a/div[2]/div[2]/div/div/div/div[2]/span'
        // let general_XPath_yanno   = '/html/body/div[1]/section/main/div/div[2]/div/div/div/div[row]/div[col]/div/a/div[2]/div[2]/div/div/div/div[2]/span'

        let fullXPath = '/html/body/div[1]/section/main/div/div[2]/div/div/div/div[' + row_num + ']/div['+ col_num+']/div/a/div[2]/div[2]/div/div/div/div[2]/span'
        return fullXPath
    }


    


}
//This call to get_insta_views is to see if our scraper works with three tabs (on profile page) instead of four
// get_insta_views("https://www.instagram.com/reel/CRRnoGsFhAY/?utm_medium=copy_link", "https://www.instagram.com/jeanca.milo/")

// This call to get_insta_views is to work with numbers that have a comma. Why is it like this idk IG devs are stupid
get_insta_views("https://www.instagram.com/reel/CQ7DcVXAyJS/?utm_medium=copy_link", "https://www.instagram.com/marianamundov/")