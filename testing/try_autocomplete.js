import getJSON from "../src/backend/scraping/utils/getJSON";


const url = "https://api.scryfall.com/catalog/card-names"
getJSON(url)
    .then(cardNameJson => console.log(cardNameJson.data))
    .then(data => data.filter())