import scrapeCard from "./scrapeCard"
import exactRytirCardSearchURL from "./exactRytirCardSearchURL"

async function getNamedCardsRytir(cardName, additionalInfo) {
    const url = exactRytirCardSearchURL(cardName)
    return await scrapeCard(url, additionalInfo)
}

export default getNamedCardsRytir