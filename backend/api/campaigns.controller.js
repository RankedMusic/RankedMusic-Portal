import CampaignsDAO from "../dao/campaignsDAO.js"

export default class CampaignsController {
    // when this api is called thru URL -> can be a query string
    // sets Rest.PP variable to equal whatever the query is in the url
    
    static async PostCampaign(req, res, next) {
        try {
            // get info from body of request
            const name = req.body.name
            const id = req.body.id
            const platform = req.body.platform
            const accountExec = req.body.accountExec
            const campManager = req.body.campManager
            const clientContact = req.body.clientContact
            const artist = req.body.artist
            const song = req.body.song
            const songLink = req.body.songLink
            // get new date
            // put data tg and send over to to db
            const CampaignResponse = await CampaignsDAO.addCampaign(
                name,
                id,
                platform,
                accountExec,
                campManager,
                clientContact,
                artist,
                song,
                songLink
            )
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }
    
    
    
    
    
    static async apiGetCampaigns(req, res, next) {
        // convert value to int -> otherwise default = 20
        const campaignsPerPage = req.query.campaignsPerPage ? parseInt(req.query.campaignsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        } 
        else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        }else if (req.query.name) {
            filters.name = req.query.name
        }
    
        const { campaignsList, totalNumCampaigns } = await CampaignsDAO.getCampaigns({
            filters,
            page,
            campaignsPerPage
        })

        let response = { 
            campaigns: campaignsList,
            page: page,
            filters: filters,
            entries_per_page: campaignsPerPage,
            total_results: totalNumCampaigns,
        }
        res.json(response)
    }
    static async apiGetCampaignById(req, res, next) {
        try {
            // look for id parameter -> call get campaigns by id -> get campaign back
            let id = req.params.id || {}
            let campaign = await CampaignsDAO.getCampaignsByID(id)
            console.log(campaign)
            if (!campaign){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(campaign)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }

    static async apiGetCampaignCuisines(req, res, next) {
        try{
            let cuisines = await CampaignsDAO.getCuisines()
            res.json(cuisines)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }
}