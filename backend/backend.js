import axios from 'axios'
import scrapeAll from "./scrapeAll";

// const cardJSON = require("../testing/aether_vial.json")

// console.log(cardJSON)

// get the url from json
// let urlSearch = new URLSearchParams(cardJSON).toString();
// console.log(urlSearch)
const cardName = "Aether Vial"

let rytirSearchJSON = {
    "akce": 3,
    "searchtype": "card",
    "searchname": cardName
}
const rytirSearchParams = new URLSearchParams(rytirSearchJSON)

// console.log(rytirSearchParams)

const rytirBaseURL = "http://cernyrytir.cz/index.php3?";
let rytirSearchURL = (rytirBaseURL + rytirSearchParams).replace("+", "%20");
// rytirSearchURL = "http://cernyrytir.cz/index.php3?akce=3&edice_magic=CC1&submit=Vyhledej"
// rytirSearchURL = "http://cernyrytir.cz/index.php3?akce=3&limit=30&edice_magic=STA&poczob=30&foil=A&triditpodle=ceny&hledej_pouze_magic=1&submit=Vyhledej"
console.log(rytirSearchURL)

const fetchHTML = async () => {
    try {
        const html = await axios
            .request({
                method: 'GET',
                url: rytirSearchURL,
                responseType: 'arraybuffer',
            })
            .then(res => {
                var decoder = new TextDecoder("windows-1250");
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
    .then(html => scrapeAll(html))
    .then(res => {
        console.log(res);
        return res
    })


// [0-9]*&nbsp;Kč