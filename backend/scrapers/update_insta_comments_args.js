import puppeteer from 'puppeteer'
import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient



async function main() {
    const uri = "mongodb+srv://machadorm:rankedthiago@cluster0.mlbwz.mongodb.net/campaign_DB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        
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
        await getCommentsFromArray(influencers, client, link_args_array)

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);


const getCommentsFromArray = async (influencers, client, insta_links_array) => {
    for(let i = 0; i < insta_links_array.length; i = i + 1){
        
        let influencer = await influencers.findOne({influencer: insta_links_array[i]})
        let single_vid_link = insta_links_array[i]
        
        let date = new Date()
        let date_string = date.toString()
        let current_date_string = date_string.substring(4,15)

        let last_date_updated = ''
        if(influencer.dates_updated.comments_updated == undefined){
            last_date_updated = 'never'
        }
        else{
            last_date_updated = influencer.dates_updated.comments_updated
            
        }

        if(!last_date_updated.includes(current_date_string)){
            let profile_url_beginning='https://www.instagram.com/'
            
            let profile_username = influencer.username_string

            let profile_url = profile_url_beginning + profile_username
            console.log(single_vid_link)
            console.log(profile_url)
            let comments_object = await get_insta_comments(single_vid_link, profile_url)

            if(comments_object != null){
                
                // let date_updated_comments_object = {date_comments_updated: date_updated_string}
                console.log('The video ' + single_vid_link + ' has ' + comments_object.num_comments) 
                console.log(comments_object)
                await influencers.updateOne(
                    { influencer: single_vid_link},
                    { $set: comments_object}
                )

                await influencers.updateOne(
                    { influencer: single_vid_link},
                    { $set: {'dates_updated.comments_updated' : current_date_string}}
                )
                await sleep(5000);
            }
            else{

                console.log('We did not get comments for the video ' + single_vid_link)
                console.log('Most likely because element is not found')
                console.log('Recheck XPath on chromium')
                console.log('')
            }
        }
    console.log('And that\'s the end')

    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



const get_insta_comments = async (video_url, profile_url) => {

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
    
    await page.waitForTimeout(2000);
    await page.$x('/html/body/div[1]/section/main/div/div[2]/a[2]/div/span');
    let reels = await page.$x('/html/body/div[1]/section/main/div/div[2]/a[2]/div/span');
    console.log(reels)
    let iteration_counter = 1
    if (reels[0] == null){
        await page.waitForTimeout(2000);
        page.waitForXPath('/html/body/div[1]/section/main/div/div[1]/a[2]/div/span')
        reels = await page.$x('/html/body/div[1]/section/main/div/div[1]/a[2]/div/span');
        console.log("reels 2", reels);
        iteration_counter = 2
        if (reels[0] == null){
            await page.waitForTimeout(2000);
            page.waitForXPath('/html/body/div[1]/section/main/div/div[1]/a[2]')
            reels = await page.$x('/html/body/div[1]/section/main/div/div[1]/a[2]'); 
            console.log("reels 3", reels);
            iteration_counter = 3
        }
    }
    await reels[0].click();

    await page.waitForTimeout(2000);
    await autoScroll(page)

    let fullXPath = await getXPath(page, video_url, iteration_counter)

    // /html/body/div[1]/section/main/div/div[3]/div/div/div/div[1]/div[1]/div/a/div[2]/div[1]/div/ul/li[2]/span[1]
    // /html/body/div[1]/section/main/div/div[3]/div/div/div/div[1]/div[2]/div/a/div[2]/div[1]/div/ul/li[2]/span[1] -
    // /html/body/div[1]/section/main/div/div[3]/div/div/div/div[row_num]/div[col_num]/div/a/div[2]/div[1]/div/ul/li[2]/span[1]

    // let gen_work_xpat = '/html/body/div[1]/section/main/div/div[3]/div/div/div/div[row_num]/div[col_num]/div/a/div[2]/div[1]/div/ul/li[2]/span[1]'
    let comments = await page.$x(fullXPath);
    if(comments.length == 0){
        console.log('try again')
        return null
    }
    else{
        let comments_text = await page.evaluate(element => element.textContent, comments[0]);
        console.log(comments_text)
        let number = 0
        if(comments_text.includes('k')){
            let regex_no_K = /[^k]*/
            comments_text = comments_text.match(regex_no_K)
            comments_text = String(comments_text)

            number = Number(comments_text)
            number = number * 1000
        }
        else if(comments_text.includes('m')){
            let regex_no_K = /[^m]*/
            comments_text = comments_text.match(regex_no_K)
            comments_text = String(comments_text)

            number = Number(comments_text)
            number = number * 1000000
        }
        else{
            number = Number(comments_text)
        }
        let comments_object = {num_comments: number}
        console.log(comments_object)
        
        await browser.close();
        return comments_object
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
    let row_num = Math.floor(vid_num/4) + 1 
    let col_num = vid_num % 4
    if(col_num == 0){
        col_num = 4
    }
    console.log('The roe number is ' + row_num)
    console.log('The col number is ' + col_num)

    //Case where we have four tabs
    if(iteration_counter == 1){
        let fullXPath = '/html/body/div[1]/section/main/div/div[3]/div/div/div/div[' + row_num +']/div['+col_num+']/div/a/div[2]/div[1]/div/ul/li[2]/span[1]'
        console.log(fullXPath)
        return fullXPath
    }
    //Case where we have three tabs
    else if(iteration_counter == 2){
        // let ex_comment_path_11th_vid = '/html/body/div[1]/section/main/div/div[2]/div/div/div/div[3]/div[3]/div/a/div[2]/div[1]/div/ul/li[2]/span[1]'
        // let ex_comment_path_12th_vid = '/html/body/div[1]/section/main/div/div[2]/div/div/div/div[3]/div[4]/div/a/div[2]/div[1]/div/ul/li[2]/span[1]'
        // let gen_comment_XPath_yannos = '/html/body/div[1]/section/main/div/div[2]/div/div/div/div[r]/div[c]/div/a/div[2]/div[1]/div/ul/li[2]/span[1]'
        let fullXPath = '/html/body/div[1]/section/main/div/div[2]/div/div/div/div[' + row_num + ']/div['+ col_num + ']/div/a/div[2]/div[1]/div/ul/li[2]/span[1]'
        console.log(fullXPath)

        return fullXPath
    }
    
   
}
//Call to test three tabs instead of 4
// get_insta_comments("https://www.instagram.com/reel/CRRnoGsFhAY/?utm_medium=copy_link", "https://www.instagram.com/jeanca.milo/")

//Call to test commas in number yanno
// get_insta_comments("https://www.instagram.com/reel/CRRnoGsFhAY/?utm_medium=copy_link", "https://www.instagram.com/jeanca.milo/")




