import puppeteer from 'puppeteer'
// const { chromium } = require('playwright')
import CaptchaSolver from 'tiktok-captcha-solver'
import CampaignsDAO from "../dao/campaignsDAO.js"
import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID


// This script is for extracting total campaign views and then inputting them into historical database
// This does no web scraping, but uses data that we scraped previously from `update_views.js` or `update_views_args.js`
async function main() {
    // we'll add code here soon
    const uri = "mongodb+srv://machadorm:rankedthiago@cluster0.mlbwz.mongodb.net/campaign_DB?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        
        await client.connect();
 
        // Make the appropriate DB calls
        // await  listDatabases(client);
        
        // console.log(influencers)
        // let influencer_video_url = await getInfluencerUrl(influencers)
        // console.log(influencer_video_url)
        // let video_likes = await getVideoLikes(influencer_video_url)
        let campaign_id_array_object = await client.db("campaign_DB").collection('campaign_id_array').findOne({name: 'campaign_id_array'});
        let campaign_id_array = campaign_id_array_object.campaign_id_array
        // console.log(campaign_id_array)
        let influencers = await getInfluencersCollection(client)
        let campaigns = await getCampaignsCollection(client)
        let historical_views = await getHistoricalViewsCollection(client)
        // console.log( await historical_views.findOne({ campaignId: new ObjectId('60d5e5db47686643ee13d9c8')}))


        // console.log(links_array)
        // let links_array = await getVideoLinksArray(influencers, client, old_links_array)
        // await getUsernamesFromArray(influencers, client, links_array)
        await inputHistoricalViews(campaigns, campaign_id_array, historical_views)

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

async function getCampaignsCollection(client){
    let campaigns = client.db("campaign_DB").collection('campaigns')
    // console.log(influencers)
    return campaigns
 
};

async function getHistoricalViewsCollection(client){
    let historical_views = client.db("historicals_DB").collection('historical_views')
    // console.log(influencers)
    return historical_views
 
};

// This method grabs the total views for every campaign and puts them into our historical
// database (one document = one listing of historical values for a single campaign)
async function inputHistoricalViews(campaigns, campaign_id_array, historical_views){
    // console.log(campaign_id_array)
    for(let i = 0; i < campaign_id_array.length; i = i + 1){
        let campaign_id = campaign_id_array[i]
       
        const campaign_with_influencers = await getCampaignsByID(
            campaigns, 
            campaign_id
        )
        // console.log(campaign_with_influencers)
        let influencers_array = campaign_with_influencers.influencers
        let campaign_name = campaign_with_influencers.name
        console.log(campaign_name)
        // console.log(influencers_array)

        //NOTE historical_array_point is the new value we want to add to the historical database
        // in mongoDB
        // ALSO, getTotViews returns an array of the format [date, total views during date]
        let historical_array_point = await getTotViews(influencers_array)
        console.log('We want to add ' + historical_array_point)
       
        let historical_views_object =  await historical_views.findOne({ campaignId: new ObjectId(String(campaign_id))})

        if (historical_views_object == null){
            let created_historical_views_object = {campaignId: campaign_id, database_ref: 'campaign_DB', historical_views: []}
            let historical_views_array = created_historical_views_object.historical_views

            historical_views_array.push(historical_array_point)
            console.log(historical_views_array)

            // let new_historical_views = {historical_views: historical_views_array}

            let inserted_object = {campaignId: new ObjectId(String(campaign_id)), campaign_name: campaign_name, database_ref: 'campaign_DB', historical_views: historical_views_array}


            await historical_views.insertOne(
                inserted_object
            )
        }
        else{
        

            let historical_views_array = historical_views_object.historical_views

            historical_views_array.push(historical_array_point)
            console.log(historical_views_array)

            let new_historical_views = {historical_views: historical_views_array}


            await historical_views.updateOne(
                { campaignId: new ObjectId(String(campaign_id))},
                { $set: new_historical_views},
            )
        }

        

        //Here we are inputting the values into the proper document in historicals_DB

    }

    
    
    // console.log(campaigns_w_influencers)
}

async function getCampaignsByID(campaigns, id) {
    try {
        // getting influencers from one campaign and putting in collection
        // create pipeline to help match collections  (match id of certain campaign)
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
                {
                    // look up influencers to add to result (apart of aggregation pipeline)
                    $lookup: {
                        from: "influencers",
                        let: {
                            id: "$_id",
                        },
                        // create pipe from influencers -> going to match restraunt id and going to find all influencers that match campaign id
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$campaignId", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        // going to set it as influencers
                        as: "influencers",
                    },
                },
                {
                    $addFields: {
                        influencers: "$influencers",
                    },
                },
        ]
        // collect everything together and return campaign w all influencers connected
    return await campaigns.aggregate(pipeline).next()
    } catch(e) {
        console.error(`Something went wrong in getCampaignByID: ${e}`)
        throw e
    }
}

async function getTotViews(influencers_array) {
    try {
            // console.log(influencers_array)
            
            let views_array = []

            for (let i = 0; i < influencers_array.length; i = i + 1){
                
                let influencer_info = influencers_array[i]
                let influencer_views = influencer_info.views_string
                
                let views_string = String(influencer_views)
                // console.log(typeof(likes_string))
                let no_string = ''
                let number = 0
                if(views_string.includes('K')){
                    let regex_no_K = /[^K]*/
                    views_string = views_string.match(regex_no_K)
                    // console.log(typeof(likes_string))
                    views_string = String(views_string)
                    // console.log(typeof(likes_string))
                    no_string = views_string.substring(6, views_string.length)
                    // console.log(no_string)
                    number = Number(no_string)
                   
                    number = number * 1000
                    // console.log(number)
                    // console.log(likes_string + ' has a K')
                }
                else if(views_string.includes('M')){
                    let regex_no_K = /[^M]*/
                    views_string = views_string.match(regex_no_K)
                    // console.log(typeof(likes_string))
                    views_string = String(views_string)
                    // console.log(typeof(likes_string))
                    no_string = views_strings.substring(6, views_string.length)
                    // console.log(no_string)
                    number = Number(no_string)
                    number = number * 1000000
                    // console.log(likes_string + ' has a K')
                }
                else{
                    // console.log(likes_string + ' no K')
                    no_string = views_string.substring(6, views_string.length)
                    number = Number(no_string)
                    // console.log(number)
                }
                
                // console.log('influencer_likes regex test is ' + number)
                // console.log(typeof(number))
                views_array.push(number)

            }
            // console.log(likes_array)

            let tot_views = 0

            for (let i = 0; i < views_array.length; i = i + 1){
                // console.log(views_array[i])
                tot_views = tot_views + views_array[i]
            }
            // console.log(tot_likes)
            // console.log('The total views are ' + tot_views)
            let date = new Date()
            let date_string = date.toString()
            
            let final_date = date_string.substring(4,15)
            // console.log(final_date)
            
            //NOTE STUFF FOR ARRAY VERSION
            // let historical_array = []
            // historical_array.push(final_date)
            // historical_array.push(tot_views)
            // console.log(historical_array)
            // return historical_array

            // NEXT: STUFF FOR OBJECT VERSION
            let historical_object = {}
            historical_object.date = final_date
            historical_object.views = tot_views
            return historical_object
        } catch (e) {
            console.log(e)
        }
    }