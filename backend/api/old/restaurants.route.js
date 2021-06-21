import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"
// get acess to express router
const router = express.Router()
// get list of all restaurants
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
// get list of a specific restaurant w specific id 
// -> once got -> give all the info when get all restaurants and list of reviews associated w that restaurant
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
// return a list of cuisines -> on front end user can select cuisine from a dropdown (populated from this)
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)
export default router