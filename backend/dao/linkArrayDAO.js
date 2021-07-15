import mongodb from "mongodb"
// gonna need so can convert string into MongoDB object
const ObjectId = mongodb.ObjectID
// emtpy and going to fill it w reference to influencers collection
let link_array
let insta_links_array_col

export default class LinkArrayDAO {
    static async injectDB(conn) {
        // if link_array exist = return
        if (link_array) {
            return
        }
        if (insta_links_array_col) {
            return
        }
        // // otherwise going to access the DB and access the influencers collection
        try {
            link_array = await conn.db(process.env.CAMPINFLUENCERS_NS).collection("links_array")
            insta_links_array_col = await conn.db(process.env.CAMPINFLUENCERS_NS).collection("insta_links_array")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
        // try {
        // } catch (e) {
        //     console.error(`Unable to establish collection handles in userDAO: ${e}`)
        // }
    }
    // add influencer -> create a influencer doc + create an object Id
    static async updateLinkArray(influencer_video_link, platform) {
        console.log(insta_links_array_col);
        if( platform.includes("Instagram")){
            try {
                console.log('The new link is ' + influencer_video_link)
                let insta_links_array_doc = await insta_links_array_col.findOne({name: 'insta_links_array'})
                let insta_links_array = insta_links_array_doc.insta_links_array
                // let links_array = Object.values(links_array_obj)
                
                insta_links_array.push(influencer_video_link)
                console.log(insta_links_array)
    
                // NOTE: link_array is the collection, links_array is what we are changing
                // We chnage it here so that when I run `node update_scraper.js`, it automatically 
                // updates values in our database for EFFICIENCY
                const updateResponse = await insta_links_array_col.updateOne(
                    { name: 'insta_links_array'},
                    { $set: { insta_links_array: insta_links_array }},
                )
    
                return updateResponse
                
                // return(link_array)
            } catch(e) {
                console.error(`Unable to post influencer: ${e}`)
                return {error: e }
            }
        }
        else if (platform.includes("Tik-Tok")){
            try {
                console.log('The new link is ' + influencer_video_link)
                let links_array_doc = await link_array.findOne({name: 'links_array'})
                let links_array = links_array_doc.links_array
                // let links_array = Object.values(links_array_obj)
                
                links_array.push(influencer_video_link)
                console.log(links_array)
    
                // NOTE: link_array is the collection, links_array is what we are changing
                // We chnage it here so that when I run `node update_scraper.js`, it automatically 
                // updates values in our database for EFFICIENCY
                const updateResponse = await link_array.updateOne(
                    { name: 'links_array'},
                    { $set: { links_array: links_array }},
                )
    
                return updateResponse
                
                // return(link_array)
            } catch(e) {
                console.error(`Unable to post influencer: ${e}`)
                return {error: e }
            }
        }
    }

    static async removeFromLinksArray(influencer_video_link) {
        if( influencer_video_link.includes("instagram")){
            try {
                // console.log('The link we want to remove is ' + influencer_video_link)
                let insta_links_array_doc = await insta_links_array_col.findOne({name: 'insta_links_array'})
                let insta_links_array = insta_links_array_doc.insta_links_array
                // let links_array = Object.values(links_array_obj)
                console.log(insta_links_array)
    
                let new_array = []
    
                for (let i = 0; i < insta_links_array.length; i = i + 1){
                    if(influencer_video_link == insta_links_array[i]){
                        console.log('do not push link ' + influencer_video_link)
                    }
                    else{
                        new_array.push(insta_links_array[i])
                    }
    
                }
    
                console.log(new_array)
                
                // links_array.push(influencer_video_link)
                // console.log(links_array)
    
                // NOTE: link_array is the collection, links_array is what we are changing
                // We chnage it here so that when I run `node update_scraper.js`, it automatically 
                // updates values in our database for EFFICIENCY
                const updateResponse = await insta_links_array_col.updateOne(
                    { name: 'insta_links_array'},
                    { $set: { insta_links_array: new_array }},
                )
    
                return updateResponse
                
                // return(link_array)
            } catch(e) {
                console.error(`Unable to post influencer: ${e}`)
                return {error: e }
            }
        }
        else if (influencer_video_link.includes("tiktok")){
            try {
                // console.log('The link we want to remove is ' + influencer_video_link)
                let links_array_doc = await link_array.findOne({name: 'links_array'})
                let links_array = links_array_doc.links_array
                // let links_array = Object.values(links_array_obj)
                console.log(links_array)
    
                let new_array = []
    
                for (let i = 0; i < links_array.length; i = i + 1){
                    if(influencer_video_link == links_array[i]){
                        console.log('do not push link ' + influencer_video_link)
                    }
                    else{
                        new_array.push(links_array[i])
                    }
    
                }
    
                console.log(new_array)
                
                // links_array.push(influencer_video_link)
                // console.log(links_array)
    
                // NOTE: link_array is the collection, links_array is what we are changing
                // We chnage it here so that when I run `node update_scraper.js`, it automatically 
                // updates values in our database for EFFICIENCY
                const updateResponse = await link_array.updateOne(
                    { name: 'links_array'},
                    { $set: { links_array: new_array }},
                )
    
                return updateResponse
                
                // return(link_array)
            } catch(e) {
                console.error(`Unable to post influencer: ${e}`)
                return {error: e }
            }

        }

    }

    static async updateInfluencer(influencerId, userId, text, date) {
        try{
           

            return updateResponse
        } catch (e) {
            console.error(`Unable to update influencer ${e}`)
            return { error: e}
        }
    }

    static async deleteInfluencer(influencerId, userId) {

        try {
            

            return deleteResponse
        } catch(e) {
            consoele.error(`Unable to delete influencer: ${e}`)
            return {error: e}
        }

    }

}