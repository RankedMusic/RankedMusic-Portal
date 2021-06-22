import InfluencersDAO from "../dao/influencersDAO.js"

export default class InfluencersController {
    static async apiPostInfluencer(req, res, next) {
        try {
            // get info from body of request
            const campaignId = req.body.campaign_id
            console.log(req.body.campaign_id)
            const influencer = req.body.influencer
            const date = new Date()
            // const userInfo = {
            //     name: req.body.name,
            //     _id: req.body.user_id
            // }
            // get new date
            // put data tg and send over to to db
            
            const InfluencerResponse = await InfluencersDAO.addInfluencer(
                campaignId,
                influencer,
                date
            )
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }
    // method that gets info from body, send over to db
    static async apiUpdateInfluencer(req, res, next) {
        try {
            const influencerId = req.body.influencer_id
            const text = req.body.text
            const date = new Date()
            // get user id bc making sure user who created influencer is updating influencer
            const influencerResponse = await InfluencersDAO.updateInfluencer(
                influencerId,
                req.body.user_id,
                text,
                date,
            )

            var{error} = influencerResponse
            if (error) {
                res.status(400).json({error})
            }
            // if mod count = 0 -> not updated and throw error
            if (influencerResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to influencer - user may not be original poster",
                )
            }
                res.json({ status: "success"})
            } catch (e) {
                res.status(500).json({error:e.message})
            }
        }
        static async apiDeleteInfluencer(req, res, next) {
            try {
                // have a query  parameter instead of a body
                const influencerId = req.query.id
                // checking the user who created is the one deleting before deleting
                const userId = req.body.user_id
                console.log(influencerId)
                // call delete influencer and send over influencer and user id
                const influencerResponse = await InfluencersDAO.deleteInfluencer(
                    influencerId,
                    userId,
                )
                res.json({ status:"success"})
            } catch (e) {
                res.status(500).json({error:e.message})
        }

    }

}