import scrapeCard from "./scrapeCard"
import addScryfallCard from "./addFunctions/addScryfallCard"
import exactRytirCardSearchURL from "./exactRytirCardSearchURL"
import getEdhrecUrl from "../utils/getEdhrecUrl"

async function getNamedCardsRytirLEGACY(cardName, additionalInfo = {}) {
    const url = exactRytirCardSearchURL(cardName)
    let result = await scrapeCard(url, additionalInfo)
    if (result.status === "success") {
        result = {
            ...result,
            edhrec_url: getEdhrecUrl(cardName),
            scryfall: { ...(await addScryfallCard(cardName)) }
        }
    }
    return result
}

export default getNamedCardsRytirLEGACY