// creating variable that will be used to store a reference to DB
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let restaurants

export default class RestaurantsDAO {
    // initially connect to DB -> call as soon as server starts
    static async injectDB(conn) {
        if (restaurants){
            return
        }
        // if not filled -> return ref to specific DB
        try{
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        }catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`,
            )
        }
    }
// will call when want to get list of restaurants in DB
    static async getRestaurants({
        // made up for method -> when called can put filter (for sort), pg #, restaurants per page
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                // any where in text -> going to search name -> specificed in mongodb
                query = { $text: {$search: filters["name"]}}
            } else if ("cuisine" in filters) {
                // if cuisine = filter passed in -> compare to what was passed in ^
                query = { "cuisine": {$eq: filters["cuisine"]}}
            }else if ("zipcode" in filters) {
                query = { "address.zipcode": {$eq: filters["zipcode"]}}
            }
        }

        let cursor

        try{
            // find all restaurants that go along w passed in query passed in
            cursor = await restaurants
                .find(query)
                // if no query -> return all restaurants
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return {restaurantsList: [], totalNumRestaurants: 0 }
        }
        // going to limit the result to rest. pp -> to get page number = skip 
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
        // set List to Array
        try {
            const restaurantsList = await displayCursor.toArray()
            // count docs in query -> get tot # restaurants
            const totalNumRestaurants = await restaurants.countDocuments(query)
        
            return {restaurantsList, totalNumRestaurants}
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { restaurantsList: [], totalNumRestaurants: 0}
        }
    }
    static async getRestaurantsByID(id) {
        try {
            // getting reviews from one restaurant and putting in collection
            // create pipeline to help match collections  (match id of certain restaurant)
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                    {
                        // look up reviews to add to result (apart of aggregation pipeline)
                        $lookup: {
                            from: "reviews",
                            let: {
                                id: "$_id",
                            },
                            // create pipe from reviews -> going to match restraunt id and going to find all reviews that match restaurant id
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$restaurant_id", "$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        date: -1,
                                    },
                                },
                            ],
                            // going to set it as reviews
                            as: "reviews",
                        },
                    },
                    {
                        $addFields: {
                            reviews: "$reviews",
                        },
                    },
            ]
            // collect everything together and return restaurant w all reviews connected
        return await restaurants.aggregate(pipeline).next()
        } catch(e) {
            console.error(`Something went wrong in getRestaurantByID: ${e}`)
            throw e
        }
    }

    static async getCuisines() {
        let cuisines = []
        try {
            // get all distinct cuisines (each one, one time) and return
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (e){
            console.error(`Unable to get cuisines, ${e}`)
            return cuisines
        }
    }
}