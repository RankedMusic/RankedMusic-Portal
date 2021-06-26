const puppeteer = require( 'puppeteer')
// import mongodb from "mongodb"
// // import mongodb from "mongodb"
// import dotenv from "dotenv"
// import require from 'require'


const MongoClient = require('mongodb').MongoClient
// console.log('hello')
// async injectDB(conn) {
//     if (campaigns){
//         return
//     }
//     // if not filled -> return ref to specific DB
//     try{
//         campaigns = await conn.db(process.env.CAMPINFLUENCERS_NS).collection("campaigns")
//     }catch (e) {
//         console.error(
//             `Unable to establish a collection handle in campaignsDAO: ${e}`,
//         )
//     }
// }