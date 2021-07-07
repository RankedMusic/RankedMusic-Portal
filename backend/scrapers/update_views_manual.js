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
        // let influencers = await getInfluencersCollection(client)
        let links_array = links_array_object.links_array
        // console.log(links_array)
        // let links_array = await getVideoLinksArray(influencers, client, old_links_array)
        // await getUsernamesFromArray(influencers, client, links_array)
        await navigateToPages(client, links_array)

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);

async function navigateToPages(client, links_array){
    try{
        for (let i = 0; i < links_array.length; i = i + 1){
            const browser = await puppeteer.launch({
                headless: false
            });
            const page = await browser.newPage();
            await page.goto(links_array[i], {
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

            // console.log(links_array[i])
        }
    }
    catch(e){
        console.log(e)

    }
}
