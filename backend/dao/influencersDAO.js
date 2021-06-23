import mongodb from "mongodb"
// gonna need so can convert string into MongoDB object
const ObjectId = mongodb.ObjectID
// emtpy and going to fill it w reference to influencers collection
let influencers

export default class InfluencersDAO {
    static async injectDB(conn) {
        // if influencer exist = return
        if (influencers) {
            return
        }
        // otherwise going to access the DB and access the influencers collection
        try {
            influencers = await conn.db(process.env.CAMPINFLUENCERS_NS).collection("influencers")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }
    // add influencer -> create a influencer doc + create an object Id
    static async addInfluencer(campaignId, influencer, date, influencer_username, avatar_src) {
        try {
            const influencerDoc = {
                influencer: influencer,
                date: date,
                campaignId: ObjectId(campaignId),
                influencer_username: influencer_username,
                avatar_src: avatar_src }
            // insert into DB (w restaurtant id converted to a MongoDb object ID)
            return await influencers.insertOne(influencerDoc)
        } catch(e) {
            console.error(`Unable to post influencer: ${e}`)
            return {error: e }
        }
    }

    static async updateInfluencer(influencerId, userId, text, date) {
        try{
            // looking for influencer w right influencer id and user id (make sure updating by creator)
            const updateResponse = await influencers.updateOne(
                { user_id: userId, _id: ObjectId(influencerId)},
                { $set: { text: text, date: date }},
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update influencer ${e}`)
            return { error: e}
        }
    }

    static async deleteInfluencer(influencerId, userId) {

        try {
            // looking for influencer id and user id -> if user id matches creator -> delete influencer
            const deleteResponse = await influencers.deleteOne({
                _id: ObjectId(influencerId),
                user_id: userId,
            })

            return deleteResponse
        } catch(e) {
            consoele.error(`Unable to delete influencer: ${e}`)
            return {error: e}
        }

    }

}