import express from "express"
import UsersController from "./users.controller.js"
import CampaignsCtrl from "./campaigns.controller.js"
import InfluencersCtrl from "./influencers.controller.js"
import DataScrapeCtrl from "./datascrape.controller.js"
// get acess to express router
const router = express.Router()
// get list of all campaigns
router.route("/thisUser").post(UsersController.GetLogin);

// router.route("/savedUser").get(UsersController.SaveUser);

router.route("/add-user").post(UsersController.PostUser)

//demonstrate protection of certain endpoints
// router.route("/thisUser").get(function (req, res, next) {
//   console.log(req.User);
//   return res.status(200).json({ message: "user logged in", loggedIn: true });

// });

router.route("/").get(CampaignsCtrl.apiGetCampaigns)
router.route("/").get(CampaignsCtrl.PostCampaign)

// ROUTE TO GET VIDEOS DEPENDING ON THE VIDEO URL PASSED IN VideoLikes.js. Now go to RestaurantsCtrl
router.route("/video_likes").post(DataScrapeCtrl.getVideoLikes)
router.route("/video_comments").post(DataScrapeCtrl.getVideoComments)
router.route("/save-username").post(DataScrapeCtrl.getInfluencerUsername)
router.route("/save-avatar").post(DataScrapeCtrl.getInfluencerAvatar)


// get list of a specific campaign w specific id 
// -> once got -> give all the info when get all campaigns and list of influencers associated w that campaign
router.route("/id/:id").get(CampaignsCtrl.apiGetCampaignById)
// return a list of cuisines -> on front end user can select cuisine from a dropdown (populated from this)
router.route("/genre").get(CampaignsCtrl.apiGetCampaignGenre)

router
    .route("/influencer")
    .post(InfluencersCtrl.apiPostInfluencer)
    .put(InfluencersCtrl.apiUpdateInfluencer)
    .delete(InfluencersCtrl.apiDeleteInfluencer)
router.route("/addCampaign").post(CampaignsCtrl.PostCampaign)
export default router