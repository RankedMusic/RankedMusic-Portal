import { response } from "express"
import UsersDAO from "../dao/usersDAO.js"

export default class UsersController {
    static async PostUser(req, res, next) {
        try {
            // get info from body of request
            const username = req.body.username
            const pass = req.body.password
            // get new date
            const date = new Date()
            // put data tg and send over to to db
            const UserResponse = await UsersDAO.addUser(
                username,
                pass
            )
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }
    // static async GetLogin(req, res, next) {
    //     // convert value to int -> otherwise default = 20
    //     const { username, password } = await CampaignsDAO.getCampaigns({
    //         username,
    //         password
    //     })

    //     let response = { 
    //         username: username,
    //         password: password
    //     }
    //     res.json(response)
    // }

    static async GetLogin(req, res, next) {
        try{
            // const isLoggedIn = false;
            const passwordAttempt = req.body.passwordAttempt;
            const username = req.body.username;
            // console.log(username, passwordAttempt);
            // console.log(req)
            // console.log(req.body)
            // if (!password) {
            //   return res.json({ message: "error finding user" });
            // }
        
            // const user = await User.findOne({ username });
            // if (!user) {
            //   return res.json({ message: "error finding user" });
            // }
        
            // if (await user.comparePassword(password)) {
            //   const cookieOptions = {
            //     expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            //     httpOnly: true,
            //   };
            //   console.log("Login Successful")
            // }
            const object = await UsersDAO.getPassword(username);
            if (object.password == passwordAttempt){
                console.log("Login Success");
                // SaveUser(username);
                // console.log(username, passwordAttempt);
                // const loggedUser = await UsersDAO.saveUser(username);
                // console.log(loggedUser)
                // return res.json({ message: "login worked" });
                res.json({ status: "success"})
            }
            else{
                console.log("Fail");
                res.json({ status: "fail"})
            }
        }catch (e) {
            res.status(500).json({error:e.message})
        }   
    }
// static async SaveUser(username){
//         try{
//             const loggedUser = username;
//             console.log(loggedUser)
//             const isLoggedIn = true;
//         }
//         catch(e){
//             console.error(`Unable to save User: ${e}`)
//             return {error: e }
//         }
//     }





    // admin powers -> fix up
    // method that gets info from body, send over to db
    // static async UpdateUser(req, res, next) {
    //     try {
    //         const influencerId = req.body.influencer_id
    //         const text = req.body.text
    //         const date = new Date()
    //         // get user id bc making sure user who created influencer is updating influencer
    //         const influencerResponse = await InfluencersDAO.updateInfluencer(
    //             influencerId,
    //             req.body.user_id,
    //             text,
    //             date,
    //         )

    //         var{error} = influencerResponse
    //         if (error) {
    //             res.status(400).json({error})
    //         }
    //         // if mod count = 0 -> not updated and throw error
    //         if (influencerResponse.modifiedCount === 0) {
    //             throw new Error(
    //                 "unable to influencer - user may not be original poster",
    //             )
    //         }
    //             res.json({ status: "success"})
    //         } catch (e) {
    //             res.status(500).json({error:e.message})
    //         }
    //     }
    //     static async apiDeleteInfluencer(req, res, next) {
    //         try {
    //             // have a query  parameter instead of a body
    //             const influencerId = req.query.id
    //             // checking the user who created is the one deleting before deleting
    //             const userId = req.body.user_id
    //             console.log(influencerId)
    //             // call delete influencer and send over influencer and user id
    //             const influencerResponse = await InfluencersDAO.deleteInfluencer(
    //                 influencerId,
    //                 userId,
    //             )
    //             res.json({ status:"success"})
    //         } catch (e) {
    //             res.status(500).json({error:e.message})
    //     }

    // }

}