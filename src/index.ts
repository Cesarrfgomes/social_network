import 'dotenv/config'
import express from "express"
import routes from "./routes"
import mongoose from 'mongoose'

const db_url = process.env.DB_URL as string

mongoose.connect(db_url).then(() => {
    console.log("Database started")
    const app = express()

    app.use(express.json())
    app.use(routes)

    app.listen(process.env.PORT, () => {
        console.log("Server started")
    })

}).catch((error) => {
    console.log(error)
})

