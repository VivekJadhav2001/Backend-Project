// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

const port = process.env.PORT || 8000

dotenv.config({
    path:'./env'
})




connectDB()
.then(() => {
    app.listen(port,() => {
        console.log(` Server Is  Running at ${port}`);
    })
})
.catch((err)=>{
    console.log(`MONGODB connection failled!!!`, err)
})
















/*
import express from 'express'
const app = express()

(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("Error:",error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })

    } catch (error) {
        console.log("ERROR",error)
        throw error
    }
})()
    
*/