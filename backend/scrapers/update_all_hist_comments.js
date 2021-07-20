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
 
        // campaign_id_array is stored in mongoDB and referenced so we can update all campaign totals views
        let campaign_id_array_object = await client.db("campaign_DB").collection('campaign_id_array').findOne({name: 'campaign_id_array'});
        let campaign_id_array = campaign_id_array_object.campaign_id_array
        
        let influencers = await getInfluencersCollection(client)
        // campaigns collection (to get campaign with influencers) and historical likes collection (so that we can update historical likes)
        let campaigns = await getCampaignsCollection(client)
        let historical_comments = await getHistoricalCommentsCollection(client)
        console.log(historical_comments)
        // console.log( await historical_views.findOne({ campaignId: new ObjectId('60d5e5db47686643ee13d9c8')}))


        await inputHistoricalComments(campaigns, campaign_id_array, historical_comments)

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

async function getHistoricalCommentsCollection(client){
    let historical_comments = client.db("historicals_DB").collection('historical_comments')
    // console.log(historical_views)
    return historical_comments
 
};

// This method grabs the total views for every campaign and puts them into our historical
// database (one document = one listing of historical values for a single campaign)
async function inputHistoricalComments(campaigns, campaign_id_array, historical_comments){
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
        // ALSO, getTotLikes returns an object of the format {date : Mon #day #year, total likes during date : #likes}
        let historical_array_point = await getTotComments(influencers_array)
        console.log('We want to add ' + historical_array_point.comments + ' likes on ' + historical_array_point.date)
       
        let historical_comments_object =  await historical_comments.findOne({ campaignId: new ObjectId(String(campaign_id))})
        console.log(historical_comments_object)
        if (historical_comments_object == null){
            let created_historical_comments_object = {campaignId: campaign_id, database_ref: 'campaign_DB', historical_likes: []}
            let historical_comments_array = created_historical_comments_object.historical_likes

            historical_comments_array.push(historical_array_point)
            console.log(historical_comments_array)

            // let new_historical_views = {historical_views: historical_views_array}

            let full_object = {campaignId: new ObjectId(String(campaign_id)), campaign_name: campaign_name, database_ref: 'campaign_DB', historical_comments: historical_comments_array}


            await historical_comments.insertOne(
                full_object
            )
        }
        else{
        

            let historical_comments_array = historical_comments_object.historical_comments

            historical_comments_array.push(historical_array_point)
            console.log(historical_comments_array)

            let new_historical_comments = {historical_likes: historical_comments_array}


            await historical_comments.updateOne(
                { campaignId: new ObjectId(String(campaign_id))},
                { $set: new_historical_comments},
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

async function getTotComments(influencers_array) {
    try {
            // console.log(influencers_array)
            
            let comments_array = []

            for (let i = 0; i < influencers_array.length; i = i + 1){
                
                let influencer_info = influencers_array[i]
                let influencer_comments = influencer_info.num_comments
                
                
                comments_array.push(influencer_comments)

            }
            // console.log(likes_array)

            let tot_comments = 0

            for (let i = 0; i < comments_array.length; i = i + 1){
                // console.log(views_array[i])
                tot_comments = tot_comments + comments_array[i]
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
            historical_object.comments = tot_comments
            return historical_object
        } catch (e) {
            console.log(e)
        }
    }