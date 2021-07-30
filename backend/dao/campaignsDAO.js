// creating variable that will be used to store a reference to DB
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let campaigns
let campaign_id_array_object


export default class CampaignsDAO {
    
    // initially connect to DB -> call as soon as server starts
    static async injectDB(conn) {
        if (campaigns){
            return
        }
        // if not filled -> return ref to specific DB
        try{
            
            campaigns = await conn.db(process.env.CAMPINFLUENCERS_NS).collection("campaigns")
            campaign_id_array_object = await conn.db(process.env.CAMPINFLUENCERS_NS).collection("campaign_id_array")
        }catch (e) {
            console.error(
                `Unable to establish a collection handle in campaignsDAO: ${e}`,
            )
        }
    }

    static async addCampaign(name, start, end, genre, id, platform, accountExec, campManager, clientContact, artist, song, songLink) {
        try {
            
            const campDoc = { 
                name: name,
                start: start,
                end: end,
                genre: genre,
                id: id,
                platform: platform,
                accountExec: accountExec,
                campManager: campManager,
                clientContact: clientContact,
                artist: artist,
                song: song,
                songLink: songLink
            }


            return await campaigns.insertOne(campDoc)
        } catch(e) {
            console.error(`Unable to post campaign: ${e}`)
            return {error: e }
        }
    }

    static async updateCampaign(campaignId, genre, platform, accountExec, campManager, clientContact, artist, song, songLink) {
        try{
            // looking for campaign w right campaign id 
            const updateResponse = await campaigns.updateOne(
                { _id: ObjectId(campaignId)},
                { $set: { 
                    genre: genre,
                    platform: platform,
                    accountExec: accountExec,
                    campManager: campManager,
                    clientContact: clientContact,
                    artist: artist,
                    song: song,
                    songLink: songLink 
                }},
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update campaign ${e}`)
            return { error: e}
        }
    }

    static async addCampaignId(campaign_id){
        try{
        // console.log('hello')
        // let new_array = []
       
        let campaign_id_string = campaign_id.toString()
        console.log('hello')
        console.log(campaign_id_array_object)
        let campaign_id_array_doc = await campaign_id_array_object.findOne({name: "campaign_id_array"})
        console.log(campaign_id_array_doc)
        let campaign_id_array = campaign_id_array_doc.campaign_id_array
        campaign_id_array.push(campaign_id_string)
        await campaign_id_array_object.updateOne({name: "campaign_id_array"}, {$set: {campaign_id_array: campaign_id_array}})

        // console.log(campaign_id_array)
    } catch (e) {
        console.error(`Unable to update campaign ${e}`)
        return { error: e}
    }
    }





// will call when want to get list of campaigns in DB
    static async getCampaigns({
        // made up for method -> when called can put filter (for sort), pg #, campaigns per page
        filters = null,
        page = 0,
        campaignsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                // any where in text -> going to search name -> specificed in mongodb
                query = { $text: {$search: filters["name"]}}
            } 
            else if ("genre" in filters) {
                // if cuisine = filter passed in -> compare to what was passed in ^
                query = { "genre": {$eq: filters["genre"]}}
            }
            // else if ("zipcode" in filters) {
            //     query = { "address.zipcode": {$eq: filters["zipcode"]}}
            // }
        }

        let cursor

        try{
            // find all campaigns that go along w passed in query passed in
            cursor = await campaigns
                .find(query)
                // if no query -> return all campaigns
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return {campaignsList: [], totalNumCampaigns: 0 }
        }
        // going to limit the result to camp. pp -> to get page number = skip 
        const displayCursor = cursor.limit(campaignsPerPage).skip(campaignsPerPage * page)
        // set List to Array
        try {
            const campaignsList = await displayCursor.toArray()
            // count docs in query -> get tot # campaigns
            const totalNumCampaigns = await campaigns.countDocuments(query)
        
            return {campaignsList, totalNumCampaigns}
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { campaignsList: [], totalNumCampaigns: 0}
        }
    }
    static async getCampaignsByID(id) {
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
                                // {
                                //     $project: {
                                //        postdate: {
                                //           $dateFromString: {
                                //             //  dateString: '$date',
                                //              timezone: 'America/New_York'
                                //           }
                                //        }
                                //     }
                                //  },
                                {
                                    $sort: {
                                        postdate : 1,
                                        views_num : -1,
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

    static async getGenre() {
        let genre = []
        try {
            // get all distinct cuisines (each one, one time) and return
            genre = await campaigns.distinct("genre")
            return genre
        } catch (e){
            console.error(`Unable to get genre, ${e}`)
            return genre
        }
    }
}