import mongodb from "mongodb"
// gonna need so can convert string into MongoDB object
const ObjectId = mongodb.ObjectID
// emtpy and going to fill it w reference to reviews collection
let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        // if review exist = return
        if (reviews) {
            return
        }
        // otherwise going to access the DB and access the reviews collection
        try {
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }
    // add review -> create a review doc + create an object Id
    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = { name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId), }
            // insert into DB (w restaurtant id converted to a MongoDb object ID)
            return await reviews.insertOne(reviewDoc)
        } catch(e) {
            console.error(`Unable to post review: ${e}`)
            return {error: e }
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try{
            // looking for review w right review id and user id (make sure updating by creator)
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId)},
                { $set: { text: text, date: date }},
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review ${e}`)
            return { error: e}
        }
    }

    static async deleteReview(reviewId, userId) {

        try {
            // looking for review id and user id -> if user id matches creator -> delete review
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            })

            return deleteResponse
        } catch(e) {
            consoele.error(`Unable to delete review: ${e}`)
            return {error: e}
        }

    }

}