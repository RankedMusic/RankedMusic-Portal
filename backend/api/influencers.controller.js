import InfluencersDAO from "../dao/influencersDAO.js"
import CampaignsDAO from "../dao/campaignsDAO.js"
// import DataScrapeCtrl from "./datascrape.controller"

export default class InfluencersController {
    static async apiPostInfluencer(req, res, next) {
        try {
            // console.log(req.body)
            // get info from body of request
            const campaignId = req.body.campaign_id
            // console.log(req.body.campaign_id)
            const influencer = req.body.influencer
            const date = new Date()
            // const influencer_username = req.body.influencer_user.username_string
            // const avatar_src = req.body.avatar.src[0] //NOTE CHANGE COMMENT_STRING TO AVATR STRING
            // console.log('The avatar src is '+ avatar_src)
            // const userInfo = {
            //     name: req.body.name,
            //     _id: req.body.user_id
            // }
            // get new date
            // put data tg and send over to to db
            
            // console.log(username)
           
            const InfluencerResponse = await InfluencersDAO.addInfluencer(
                campaignId,
                influencer,
                date
                // influencer_username,
                // avatar_src
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
                // console.log(influencerId)
                // call delete influencer and send over influencer
                const influencerResponse = await InfluencersDAO.deleteInfluencer(
                    influencerId,
                )
                res.json({ status:"success"})
            } catch (e) {
                res.status(500).json({error:e.message})
        }
    }

     static async getInfluencerUsername(req, res, next) {
        try {
            // console.log(req.body)
            let video_url = req.body.video_link
            console.log(video_url)

            

            const username_response = await InfluencersDAO.pullInfluencerUsername(
                video_url
            )
            console.log(username_response)
            res.json(username_response)
        } catch (e) {
            res.status(500).json({error:e.message})
        }
        }
    


    static async getInfluencerAvatar(req, res, next) {
        
    }

    static async pullVideoLikes(req, res, next) {
        try {
                // console.log('hello')
                let video_url = req.body.video_url
                // console.log(video_url)

                const likes_response = await InfluencersDAO.pullVideoLikes(
                    video_url
                )
                // console.log(likes_response)
                res.json(likes_response)
            } catch (e) {
                res.status(500).json({error:e.message})
            }
        }

        static async getTotLikes(req, res, next) {
            try {
                    // console.log(req.body)
                    const campaign_id = req.body.campaign_id
                    // let video_url = req.body.video_url
                    // console.log(video_url)
    
                    const campaign_with_influencers = await CampaignsDAO.getCampaignsByID(
                        campaign_id
                    )
                    const influencers_array = campaign_with_influencers.influencers
                    
                    let likes_array = []

                    for (let i = 0; i < influencers_array.length; i = i + 1){
                        
                        let influencer_info = influencers_array[i]
                        let influencer_likes = influencer_info.like_string
                        
                        let likes_string = String(influencer_likes)
                        // console.log(typeof(likes_string))
                        let no_string = ''
                        let number = 0
                        if(likes_string.includes('K')){
                            let regex_no_K = /[^K]*/
                            likes_string = likes_string.match(regex_no_K)
                            // console.log(typeof(likes_string))
                            likes_string = String(likes_string)
                            // console.log(typeof(likes_string))
                            no_string = likes_string.substring(6, likes_string.length)
                            // console.log(no_string)
                            number = Number(no_string)
                            number = number * 1000
                            // console.log(likes_string + ' has a K')
                        }
                        else{
                            // console.log(likes_string + ' no K')
                            no_string = likes_string.substring(6, likes_string.length)
                            number = Number(no_string)
                        }
                        
                        // console.log('influencer_likes regex test is ' + number)
                        // console.log(typeof(number))
                        likes_array.push(number)

                    }
                    // console.log(likes_array)

                    let tot_likes = 0

                    for (let i = 0; i < likes_array.length; i = i + 1){
                        tot_likes = tot_likes + likes_array[i]
                    }
                    // console.log(tot_likes)
                    res.json(tot_likes)
                } catch (e) {
                    res.status(500).json({error:e.message})
                }
            }

        static async apiDeleteInfluencer(req, res, next) {
            try {
                // have a query  parameter instead of a body
                const influencerId = req.query.id
                // console.log(influencerId)
                // call delete influencer and send over influencer
                const influencerResponse = await InfluencersDAO.deleteInfluencer(
                    influencerId,
                )
                res.json({ status:"success"})
            } catch (e) {
                res.status(500).json({error:e.message})
        }
    }

    static async pullVideoComments(req, res, next) {
        try {
                // console.log('hello')
                let video_url = req.body.video_url
                // console.log(video_url)

                const comments_response = await InfluencersDAO.pullVideoComments(
                    video_url
                )
                // console.log(likes_response)
                res.json(comments_response)
            } catch (e) {
                res.status(500).json({error:e.message})
            }
        }

        static async getTotComments(req, res, next) {
            try {
                    // console.log(req.body)
                    const campaign_id = req.body.campaign_id
                   
                    const campaign_with_influencers = await CampaignsDAO.getCampaignsByID(
                        campaign_id
                    )
                    const influencers_array = campaign_with_influencers.influencers
                    // console.log(influencers_array)
                    let comments_array = []

                    for (let i = 0; i < influencers_array.length; i = i + 1){
                        
                        let influencer_info = influencers_array[i]
                        let influencer_comments = influencer_info.comments_string
                        
                        let comments_string = String(influencer_comments)
                        // console.log(typeof(likes_string))
                        let no_string = ''
                        let number = 0
                        if(comments_string.includes('K')){
                            let regex_no_K = /[^K]*/
                            comments_string = comments_string.match(regex_no_K)
                            // console.log(typeof(likes_string))
                            comments_string = String(likes_string)
                            // console.log(typeof(likes_string))
                            no_string = comments_string.substring(9, comments_string.length)
                            // console.log(no_string)
                            number = Number(no_string)
                            number = number * 1000
                            // console.log(likes_string + ' has a K')
                        }
                        else{
                            // console.log(likes_string + ' no K')
                            no_string = comments_string.substring(9, comments_string.length)
                            number = Number(no_string)
                        }
                        
                        // console.log('influencer_comments regex test is ' + number)
                        // console.log(typeof(number))
                        comments_array.push(number)

                    }
                    // console.log(comments_array)

                    let tot_comments = 0

                    for (let i = 0; i < comments_array.length; i = i + 1){
                        tot_comments = tot_comments + comments_array[i]
                    }
                    // console.log(tot_comments)
                    res.json(tot_comments)
                } catch (e) {
                    res.status(500).json({error:e.message})
                }
            }
        static async pullVideoViews(req, res, next) {
            try {
                    // console.log('hello')
                    let video_url = req.body.video_url
                    // console.log(video_url)
    
                    const views_response = await InfluencersDAO.pullVideoViews(
                        video_url
                    )
                    // console.log(likes_response)
                    res.json(views_response)
                } catch (e) {
                    res.status(500).json({error:e.message})
                }
            }

    static async getTotViews(req, res, next) {
            try {
                    // console.log(req.body)
                    const campaign_id = req.body.campaign_id
                    // let video_url = req.body.video_url
                    // console.log(video_url)
    
                    const campaign_with_influencers = await CampaignsDAO.getCampaignsByID(
                        campaign_id
                    )
                    const influencers_array = campaign_with_influencers.influencers
                    
                    let views_array = []

                    for (let i = 0; i < influencers_array.length; i = i + 1){
                        
                        let influencer_info = influencers_array[i]
                        let influencer_views = influencer_info.views_num
                    
                        views_array.push(influencer_views)

                    }
                    // console.log(likes_array)

                    let tot_views = 0

                    for (let i = 0; i < views_array.length; i = i + 1){
                        console.log(views_array[i])
                        tot_views = tot_views + views_array[i]
                    }
                    // console.log(tot_likes)
                    res.json(tot_views)
                } catch (e) {
                    res.status(500).json({error:e.message})
                }
            }

}