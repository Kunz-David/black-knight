import express from "express"
import cors from "cors"
import { DEFAULT_BACKEND_PORT } from "../utils/constants/backendPort"
import { default as logger } from "morgan"
import bodyParser from "body-parser"
import mongoose from "mongoose"

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || DEFAULT_BACKEND_PORT // Loaded from .env file
        this.paths = {
            api: "/api",
            searchCard: "/api/card",
            // homepage: "/api/homepage",
        }

        this.setupMiddlewares()
        this.setupRoutes()
        // this.createDBFromScryfall()
        // this.db = this.connectToDB()
    }

    setupMiddlewares() {
        this.app.use(cors())
        const allowCrossDomain = function (req, res, next) {
            res.header('Access-Control-Allow-Origin', "*")
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            next()
        }

        this.app.use(allowCrossDomain)
        this.app.use(bodyParser.json())
    }

    populateDBFromScryfall() {
    }

    connectToDB() {
        const url = "mongodb+srv://david-kunz:" + process.env.DB_PASSWORD + "@cluster.qhdmw.mongodb.net/cards?retryWrites=true&w=majority"
        mongoose.connect(url)
        const db = mongoose.connection
        db.on("error", (error) => console.error(error))
        db.once("open", () => console.log("Connected to database."))
        return db
    }

    // Bind controllers to routes
    setupRoutes() {

        function errorHandler(err, req, res, next) {
            console.error(err.stack)
            res.status(500)
            res.render('error', { error: err })
        }

        this.app.use(errorHandler)
        this.app.use(this.paths.api, logger("dev"))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Backend running on http://localhost:${this.port}`)
        })
    }
}

export default Server