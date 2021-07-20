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
router.route("/addCampaign").put(CampaignsCtrl.UpdateCampaign)

// ROUTE TO GET VIDEOS DEPENDING ON THE VIDEO URL PASSED IN VideoLikes.js. Now go to RestaurantsCtrl
router.route("/video_likes").post(InfluencersCtrl.pullVideoLikes)
router.route("/tot-likes").post(InfluencersCtrl.getTotLikes)
router.route("/tot-comments").post(InfluencersCtrl.getTotComments)
router.route("/tot-views").post(InfluencersCtrl.getTotViews)
router.route("/tot-followers").post(InfluencersCtrl.getTotFollowers)
router.route("/tot-influencers").post(InfluencersCtrl.getInfluencerCount)
router.route("/video_comments").post(InfluencersCtrl.pullVideoComments)
router.route("/video_views").post(InfluencersCtrl.pullVideoViews)
router.route("/influencer_followers").post(InfluencersCtrl.pullInfluencerFollowers)
router.route("/historical-views").post(CampaignsCtrl.pullHistoricalViews)
router.route("/historical-likes").post(CampaignsCtrl.pullHistoricalLikes)
router.route("/historical-comments").post(CampaignsCtrl.pullHistoricalComments)
// router.route("/historical-followers").post(CampaignsCtrl.pullHistoricalFollowers)



router.route("/remove-from-links_array").post(DataScrapeCtrl.removeFromLinksArray)



router.route("/save-username").post(InfluencersCtrl.getInfluencerUsername)
router.route("/save-avatar").post(DataScrapeCtrl.getInfluencerAvatar)
router.route("/link-array").post(DataScrapeCtrl.addLinkArray)


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
router.route("/userRole").post(UsersController.GetRole)
export default router