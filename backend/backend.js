import {DEFAULT_BACKEND_PORT} from "../utils/constants/backendPort";
import express from "express";
import scrapeCard from "./scraping/scrapeCard";
import cardSearchURL from "./scraping/cardSearchURL";

const port = process.env.PORT || DEFAULT_BACKEND_PORT

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// /:set/:language/:treatment/:condition
app.get('/api/card/:name', (req, res) => {
    const params = req.params
    if (!params) {
        res.json({
            error: "no params given"
        });
    } else {
        scrapeCard(cardSearchURL(params.name))
            .then(r => res.json(r))
            .catch(error => console.log(error))
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})