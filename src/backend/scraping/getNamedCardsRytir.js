import exactCardSearchURL from "./exactCardSearchURL";
import scrapeCard from "./scrapeCard";

async function getNamedCardsRytir(cardName) {
    const url = exactCardSearchURL(cardName)
    return await scrapeCard(url)
}

export default getNamedCardsRytir