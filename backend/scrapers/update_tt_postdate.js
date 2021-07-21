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
//         await getPostDateFromArray(influencers, client, links_array)
//         // await getAvatarsFromArray(influencers, client, links_array)
        
        
        


 
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

// async function getInfluencersCollection(client){
//     let influencers = client.db("campaign_DB").collection('influencers')
//     // console.log(influencers)
//     return influencers
 
// };

// async function getPostDateFromArray(influencers, client, links_array){
    
//     for (let i = 0; i < links_array.length; i = i + 1){
        
//         let influencer = await influencers.findOne({influencer: links_array[i]})
//         let single_video_url = influencer.influencer
//         // console.log(single_video_url)
        
        
        
//             let postdate = await getPostDate(single_video_url)
//             // console.log('The influencer postdate is ' + influencer_postdate.postdate_string)
//             await influencers.updateOne(
//                 { influencer: single_video_url},
//                 { $set: postdate},
//             )
//             await sleep(5000);
        
//     }
// }



// async function getPostDate(url) {
//     try {
        
        
        
//             // open the browser and prepare a page
//             const browser = await puppeteer.launch({ headless : false, args: ["--window-size=0,0", "--window-position=1001,0"]  });
//             const page = await browser.newPage();
//             page.setDefaultNavigationTimeout(0)
//             // open the page to scrape
//         //   "https://www.tiktok.com/@bbmoods/video/6971426257842064646"
//             await page.goto(url, {waitUntil: 'domcontentloaded'});
//             // execute the JS in the context of the page to get all the links
//             // Note, for XPath, we need to use the FULL XPATH from Chrome Dev Ops
//             await page.waitForXPath('/html/body/div[1]/div/div[2]/div[2]/div/div/main/div/div[1]/span/div/div[1]/div[1]/a[2]/h4/text()[2]')
//             let postdate = await page.$x('/html/body/div[1]/div/div[2]/div[2]/div/div/main/div/div[1]/span/div/div[1]/div[1]/a[2]/h4/text()[2]');
//             //   console.log(postdate)
//             let postdate_text = await page.evaluate(element => element.textContent, postdate[0]);
//             let postdate_correct_format = formatPostDate(postdate_text)
//             // console.log(postdate_correct_format)
//             let postdate_object = {postdate: postdate_correct_format}
              
//             await browser.close();
//             return postdate_object
           

//         } catch (e) {
//             console.log(e)
//         }
// }

function formatPostDate(postdate_text){
    let post_year = 2021
    let months_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    if(postdate_text.includes('-')){
        
        let month_num_regex = /[^-]+/
        let month_num = Number(postdate_text.match(month_num_regex))
        console.log('The post month number is ' + month_num)
        // console.log(postdate_text)
        let post_month = months_array[month_num - 1]
        // console.log('The post month is ' + post_month)
        let day_num_regex = /[^-]*$/
        let post_day = postdate_text.match(day_num_regex)
        // console.log('The post day is ' + post_day)
        console.log('The post date ' + post_month + ' ' + post_day + ' ' + post_year)
        let post_date = post_month + ' ' + post_day + ' ' + post_year
        return post_date
    }
    else{
        console.log(postdate_text)
        let days_ago_num = Number(postdate_text.substring(0,1))
        
        let date = new Date()
        let date_string = date.toString()
        // let today_date = date_string.substring(4,15)
        
        
        // let split_date = today_date.split(' ')
        // console.log(days_ago_num)
        // let today_day_num = Number(split_date[1])
        // let cur_month = split_date[0]
        // console.log(today_day_num)
        let cur_month = 'Jun'
        let cur_month_num = months_array.indexOf('Jun')
        let today_day_num = 2

        let post_day_num = today_day_num - days_ago_num
        // console.log(post_day_num)
        if(post_day_num < 0){
            // odd_month = 31 days
            // even_month = 30 days
            // feb = 28
            post_day_num = 30 + post_day_num
            console.log(post_day_num)
        }
        console.log('The post date ' + post_month + ' ' + post_day_num + ' ' + post_year)
        let post_date = post_month + ' ' + post_day + ' ' + post_year
        
    }


}

formatPostDate('5d ago')

