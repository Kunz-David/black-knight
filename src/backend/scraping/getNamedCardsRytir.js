import exactCardSearchURL from "./exactCardSearchURL";
import scrapeCard from "./scrapeCard";

async function getNamedCardsRytir(cardName, additionalInfo = {}) {
    const url = exactCardSearchURL(cardName)
    return await scrapeCard(url, additionalInfo)
}

export default getNamedCardsRytir