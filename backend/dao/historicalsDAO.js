// import puppeteer from 'puppeteer'
// const { chromium } = require('playwright')
// import CaptchaSolver from 'tiktok-captcha-solver'
// import CampaignsDAO from "../dao/campaignsDAO.js"
import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectID


const uri = "mongodb+srv://machadorm:rankedthiago@cluster0.mlbwz.mongodb.net/campaign_DB?retryWrites=true&w=majority";

const client = new MongoClient(uri);


export default class getHistoricalDatabase {
    // we'll add code here soon
    static async historicalViewsCol(){
        await client.connect();
        let historical_views = client.db("historicals_DB").collection('historical_views')
        return historical_views
    }
    static async historicalLikesCol(){
        await client.connect();
        let historical_likes = client.db("historicals_DB").collection('historical_likes')
        return historical_likes
    }
    static async historicalCommentsCol(){
        await client.connect();
        let historical_comments = client.db("historicals_DB").collection('historical_comments')
        return historical_comments
    }
    // static async historicalFollowersCol(){
    //     let historical_followers = client.db("historicals_DB").collection('historical_followers')
    //     return historical_followers
    // }
}



    // static async 

