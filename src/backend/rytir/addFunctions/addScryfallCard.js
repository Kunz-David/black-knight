import getJSON from "../utils/getJSON"


async function addScryfallCard(cardName) {
    return await getJSON("https://api.scryfall.com/cards/named?fuzzy=" + cardName)
}

export default addScryfallCard