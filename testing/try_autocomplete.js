import getJSON from "../src/backend/rytir/utils/getJSON"


const url = "https://api.scryfall.com/catalog/card-names"
getJSON(url)
    .then(cardNameJson => console.log(cardNameJson.data))
    .then(data => data.filter())