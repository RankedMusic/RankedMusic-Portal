import puppeteer from 'puppeteer'
// const { chromium } = require('playwright')
import CaptchaSolver from 'tiktok-captcha-solver'
import CampaignsDAO from "../dao/campaignsDAO.js"
import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID

async function main() {
    const uri = "mongodb+srv://machadorm:rankedthiago@cluster0.mlbwz.mongodb.net/campaign_DB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        let campaign_id_array_object = await client.db("campaign_DB").collection('campaign_id_array').findOne({name: 'campaign_id_array'});
        let campaign_id_array = campaign_id_array_object.campaign_id_array
        
        let influencers = await getInfluencersCollection(client)

        let campaigns = await getCampaignsCollection(client)
        let historical_followers = await getHistoricalFollowersCollection(client)
        console.log(historical_followers)

        await inputHistoricalFollowers(campaigns, campaign_id_array, historical_followers)
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
    return influencers
};

async function getCampaignsCollection(client){
    let campaigns = client.db("campaign_DB").collection('campaigns')
    return campaigns
};

async function getHistoricalFollowersCollection(client){
    let historical_followers = client.db("historicals_DB").collection('historical_followers')
    return historical_followers
};

async function inputHistoricalFollowers(campaigns, campaign_id_array, historical_followers){
    for(let i = 0; i < campaign_id_array.length; i = i + 1){
        let campaign_id = campaign_id_array[i]
       
        const campaign_with_influencers = await getCampaignsByID(
            campaigns, 
            campaign_id
        )
        let influencers_array = campaign_with_influencers.influencers
        let campaign_name = campaign_with_influencers.name
        console.log(campaign_name)

        let historical_array_point = await getTotFollowers(influencers_array)
        console.log('We want to add ' + historical_array_point.followers + ' followers on ' + historical_array_point.date)
       
        let historical_followers_object =  await historical_followers.findOne({ campaignId: new ObjectId(String(campaign_id))})
        console.log(historical_followers_object)
        if (historical_followers_object == null){
            let created_historical_followers_object = {campaignId: campaign_id, database_ref: 'campaign_DB', historical_followers: []}
            let historical_followers_array = created_historical_followers_object.historical_followers

            historical_followers_array.push(historical_array_point)
            console.log(historical_followers_array)

            // let new_historical_views = {historical_views: historical_views_array}

            let full_object = {campaignId: new ObjectId(String(campaign_id)), campaign_name: campaign_name, database_ref: 'campaign_DB', historical_followers: historical_followers_array}


            await historical_followers.insertOne(
                full_object
            )
        }
        else{
        

            let historical_followers_array = historical_followers_object.historical_followers

            historical_followers_array.push(historical_array_point)
            console.log(historical_followers_array)

            let new_historical_followers = {historical_likes: historical_followers_array}


            await historical_followers.updateOne(
                { campaignId: new ObjectId(String(campaign_id))},
                { $set: new_historical_followers},
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

async function getTotFollowers(influencers_array) {
    try {
            // console.log(influencers_array)
            
            let followers_array = []

            for (let i = 0; i < influencers_array.length; i = i + 1){
                
                let influencer_info = influencers_array[i]
                let influencer_followers = influencer_info.num_followers
                
                
                followers_array.push(influencer_followers)

            }
            // console.log(likes_array)

            let tot_followers = 0

            for (let i = 0; i < followers_array.length; i = i + 1){
                // console.log(views_array[i])
                tot_followers = tot_followers + followers_array[i]
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
            historical_object.followers = tot_followers
            return historical_object
        } catch (e) {
            console.log(e)
        }
    }