import axios from 'axios'
import scrapeWithAllFunctions from "../backend/scraping/scrapeWithAllFunctions";
import scrapedToJsons from "../backend/scraping/utils/scrapedToJsons";
import scrapeCard from "../backend/scraping/scrapeCard";
import exactCardSearchURL from "../backend/scraping/exactCardSearchURL";

// const cardJSON = require("../testing/aether_vial.json")

// console.log(cardJSON)

// get the url from json
// let urlSearch = new URLSearchParams(cardJSON).toString();
// console.log(urlSearch)
// const cardName = "Aether Vial"
// const cardName = "Swamp"
const cardName = "Dark confidant"

const rytirSearchURL = exactCardSearchURL(cardName)

scrapeCard(rytirSearchURL).then(res => {
    console.log(res)
    console.log(res.length)
})

const fetchHTML = async () => {
    try {
        const html = await axios
            .request({
                method: 'GET',
                url: rytirSearchURL,
                responseType: 'arraybuffer',
            })
            .then(res => {
                const decoder = new TextDecoder("windows-1250");
                return decoder.decode(res.data)
            })
        // console.log(html);
        return html
    } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
    }
}

const scrapedData = fetchHTML()
    .then(html => scrapeWithAllFunctions(html))
    .then(res => {
        // console.log(res);
        return res
    })
    .then(res => {
        // console.log(scrapedToJsons(res))
        return scrapedToJsons(res)
    })


// [0-9]*&nbsp;Kč