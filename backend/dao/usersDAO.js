import mongodb from "mongodb"
// gonna need so can convert string into MongoDB object
const ObjectId = mongodb.ObjectID
// emtpy and going to fill it w reference to influencers collection
let users

export default class UsersDAO {
    static async injectDB(conn) {
        // if user exist = return
        if (users) {
            return
        }
        // otherwise going to access the DB and access the users collection
        try {
            users = await conn.db(process.env.CAMPINFLUENCERS_NS).collection("users")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

// Need to make it so if Admin is logged in then functions below work
// Add user id? random user id or admin makes it?

    // add user -> create a user doc + create an object Id
    static async addUser(username, password) {
        try {
            const userDoc = { 
                username: username,
                password: password,
                // campaign_id: ObjectId(campaignId), 
            }
            // insert into DB (w campaign id converted to a MongoDb object ID)
            console.log(userDoc.username)
            console.log(users)
            return await users.insertOne(userDoc)
        } catch(e) {
            console.error(`Unable to post user: ${e}`)
            return {error: e }
        }
    }
    static async getPassword(usernameAttempt){
        try{
            return await users.findOne( 
                { "username": usernameAttempt }, 
                { fields: {_id: 0, username: 0 }} 
            )
        }
        catch(e){
            console.error(`Unable to identify associated password: ${e}`)
            return {error: e }
        }
    }  
}






    // static async updateInfluencer(influencerId, userId, text, date) {
    //     try{
    //         // looking for influencer w right influencer id and user id (make sure updating by creator)
    //         const updateResponse = await influencers.updateOne(
    //             { user_id: userId, _id: ObjectId(influencerId)},
    //             { $set: { text: text, date: date }},
    //         )

    //         return updateResponse
    //     } catch (e) {
    //         console.error(`Unable to update influencer ${e}`)
    //         return { error: e}
    //     }
    // }

    // static async deleteInfluencer(influencerId, userId) {

    //     try {
    //         // looking for influencer id and user id -> if user id matches creator -> delete influencer
    //         const deleteResponse = await influencers.deleteOne({
    //             _id: ObjectId(influencerId),
    //             user_id: userId,
    //         })

    //         return deleteResponse
    //     } catch(e) {
    //         consoele.error(`Unable to delete influencer: ${e}`)
    //         return {error: e}
    //     }

    // }