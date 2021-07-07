// import puppeteer from 'puppeteer'
// const { chromium } = require('playwright')
// import CaptchaSolver from 'tiktok-captcha-solver'
// import CampaignsDAO from "../dao/campaignsDAO.js"
import mongodb from "mongodb"
const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectID



async function getHistoricalDatabase() {
    // we'll add code here soon
    const uri = "mongodb+srv://machadorm:rankedthiago@cluster0.mlbwz.mongodb.net/campaign_DB?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    await client.connect();
    let historical_views = client.db("historicals_DB").collection('historical_views')
    return historical_views
}

export default getHistoricalDatabase

    // static async 

