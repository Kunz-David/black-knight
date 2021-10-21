import express from "express";
// import cors from "cors";
import {DEFAULT_BACKEND_PORT} from "../utils/constants/backendPort";
import {default as logger} from "morgan";
import bodyParser from "body-parser";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || DEFAULT_BACKEND_PORT; // Loaded from .env file
        this.paths = {
            api: "/api",
            searchCard: "/api/card",
            // homepage: "/api/homepage",
        };

        this.setupMiddlewares();
        this.setupRoutes();
        this.createDBFromScryfall()
    }

    setupMiddlewares() {
        // this.app.use(cors());
        this.app.use(bodyParser.json())
    }

    createDBFromScryfall() {
        // this.oracleCardsDB = Low(new JSONFile("/db/oracle-cards-20211021090354.json"))
    }

    // Bind controllers to routes
    setupRoutes() {

        function errorHandler(err, req, res, next) {
            console.error(err.stack)
            res.status(500)
            res.render('error', {error: err})
        }

        this.app.use(errorHandler)
        this.app.use(this.paths.api, logger("dev"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Backend running on http://localhost:${this.port}`)
        });
    }
}

export default Server