import axios from 'axios'
import scrapeWithAllFunctions from "../src/backend/rytir/scrapeWithAllFunctions"
import scrapedToJsons from "../src/backend/rytir/utils/scrapedToJsons"
import scrapeCard from "../src/backend/rytir/scrapeCard"
import exactCardSearchURL from "../src/backend/rytir/exactRytirCardSearchURL"
import { get } from 'lodash'
import getNamedCards from '../src/backend/rytir/getNamedCards'

// const cardJSON = require("../testing/aether_vial.json")

// console.log(cardJSON)

// get the url from json
// let urlSearch = new URLSearchParams(cardJSON).toString();
// console.log(urlSearch)
// const cardName = "Aether Vial"
// const cardName = "Swamp"
// const cardName = "Dark confidant"
var cardName
cardName = "Cosima, God of the Voyage // The Omenkeel"
cardName = "Cosima, God of the Voyage // The Omenkeel"


const rytirSearchURL = exactCardSearchURL(cardName)
console.log(rytirSearchURL)

// scrapeCard(rytirSearchURL).then(res => {
//     console.log(res)
//     console.log(res.length)
//     const typeline = get(res, "scryfall.typeline")
//     console.log({ typeline })
// })

getNamedCards(cardName).then(res => {
    // console.log(res)
    const typeline = get(res, "scryfall.type_line")
    console.log(res.scryfall.type_line)
    console.log({ typeline })
})

const fetchHTML = async () => {
    try {
        // noinspection UnnecessaryLocalVariableJS
        const html = await axios
            .request({
                method: 'GET',
                url: rytirSearchURL,
                responseType: 'arraybuffer',
            })
            .then(res => {
                const decoder = new TextDecoder("windows-1250")
                return decoder.decode(res.data)
            })
        // console.log(html);
        return html
    } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log(error)
    }
}

// eslint-disable-next-line no-unused-vars
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