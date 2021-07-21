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
        await getViewsFromArray(influencers, client, links_array)

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

async function getViewsFromArray(influencers, client, links_array){
    
    for (let i = 0; i < links_array.length; i = i + 1){
        
        let influencer = await influencers.findOne({influencer: links_array[i]})
        let single_video_url = influencer.influencer
        let profile_url_beginning='https://www.tiktok.com/@'
        
        let profile_username = influencer.username_string
        // console.log(profile_username)
        let profile_url = profile_url_beginning + profile_username
        // console.log(profile_url)
        
        // console.log(single_video_url)
        let views_object = await get_Num_Views(single_video_url, profile_url)
        
        if(views_object != null){
            let date = new Date()
            let date_string = date.toString()
            let final_date = date_string.substring(4,15)
            let date_updated_string = 'Views Updated ' + final_date
            let date_updated_views_object = {date_views_updated: date_updated_string}
            console.log('The video ' + single_video_url + ' has ' + views_object.views_num) 
            console.log(views_object)
            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: views_object}
            )

            await influencers.updateOne(
                { influencer: single_video_url},
                { $set: date_updated_views_object}
            )
            await sleep(10000);
        }
        else{

            console.log('We did not get views for the video ' + single_video_url)
            console.log('Most likely because element is not found')
            console.log('Recheck XPath on chromium')
            console.log('')
        }
    }
}

const get_Num_Views = async (video_url, profile_url) => {
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
    // const captchaSolver = new CaptchaSolver(page)
    // await captchaSolver.solve()
    // await captchaSolver.solve()
    await page.waitForTimeout(30000);
    await autoScroll(page)
    // await page.waitForNavigation({waitUntil: 'load'});             // consider navigation to be finished when the load event is fired.
    // await page.waitForNavigation({waitUntil: 'domcontentloaded'}); // consider navigation to be finished when the DOMContentLoaded event is fired.
    // await page.waitForNavigation({waitUntil: 'networkidle0'});     // consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
    // await page.waitForNavigation({waitUntil: 'networkidle2'}); 

    

    // seventeenth_video_url = 'https://www.tiktok.com/@officialdankhumor/video/6966431735592537349'
    


    // await autoScroll(page);
    const fullXPath = await getXPath(page, video_url);
    // console.log('The full XPath from the num_Views function is: ' + fullXPath)

    

    // await page.waitForXPath(fullXPath);

    // let views = await page.$x(fullXPath);

    // await page.waitForXPath(fullXPath);

    // let views = await page.$x('/html/body/div/div/div[2]/div[2]/div/main/div[2]/div[1]/div[3]/div[1]/div/div/a/span/div/div/div/div/div/strong');

    let views = await page.$x(fullXPath);
    // let correct XPath = '/html/body/div[1]/div/div[3]/div[2]/div/main/div[2]/div[1]/div[ + div container + ]/div/div/div/a/span/div/div/div/div/div/strong'

    // let views = await page.$x(fullXPath);

    // console.log(views)

    if(views.length == 0){
        console.log('try again')
        return null
    }
    else{
        let views_text = await page.evaluate(element => element.textContent, views[0]);
        console.log(views_text)
        // console.log(typeof(views_text))

        //This next part is for storing the views as a number, rather than as a string like before
        
        let number = 0
        if(views_text.includes('K')){
            let regex_no_K = /[^K]*/
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
        else if(views_text.includes('M')){
            let regex_no_K = /[^M]*/
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
    // console.log(typeof(fullXPath))



    // console.log('HELLO DONE SCROLLING')

    

    
};

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
    let video_counter = 1
    let video_array = []

    
    const hrefs = await page.$$eval('a', as => as.map(a => a.href));
    // console.log(hrefs)

    // console.log(hrefs[0].includes('video'))

    for(let i = 0; i < hrefs.length; i = i + 1)
    {
        // console.log('link number ' + i)
        if(hrefs[i].includes('video')){
            // console.log('The link ' + i + ' has the word video in it. The link is: ' + hrefs[i])
            video_counter = video_counter + 1
            // console.log('There are now ' + video_counter + ' videos \n')
            video_array.push(hrefs[i])
        }
    }

    let found_vid = false
    let div_counter = 0
    let div_num = 0
    // console.log(video_array)
    for(let i = 0; i < video_array.length; i = i + 1)
    {

        // console.log('link number ' + i)
        if(video_array[i].includes(video_url) && found_vid == false){
            // div_num = div_num + 1
            div_counter = div_counter + 1
            // console.log('The video ' + video_array[i] + ' is in the ' + div_counter + ' div')
            found_vid = true
            
        }
        if(!video_array[i].includes(video_url) && found_vid == false){
            // div_num = div_num + 1
            div_counter = div_counter + 1
            // console.log('The video ' + video_array[i] + ' is in the ' + div_counter + ' div')
            
        }
        if(found_vid == true){
            div_num = div_counter
            // console.log('The div number is ' + div_num)

            
            
        }
        
    }

    // const fullXPath = '/html/body/div/div/div[2]/div[2]/div/main/div[2]/div[1]/div[' + div_num + ']/div[1]/div/div/a/span/div/div/div/div/div/strong'
    //   OLD XPATH const fullXPath = '/html/body/div[1]/div/div[3]/div[2]/div/main/div[2]/div[1]/div[' + div_num + ']/div/div/div/a/span/div/div/div/div/div/strong'
    const fullXPath = '/html/body/div[1]/div/div[2]/div[2]/div/main/div[2]/div[1]/div[' + div_num + ']/div/div/div/a/span/div/div/div/div/div/strong'
        return fullXPath
    // console.log('The full XPath is ' + fullXPath)
    

    

}

