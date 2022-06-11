import exactRytirCardSearchURL from "./exactCardSearchURL";
import scrapeCard from "./scrapeCard";
import { toLower } from "lodash";
import addScryfallCard from "./addFunctions/addScryfallCard";

function getEdhrecUrl(cardName) {
    let edhrecCardName = toLower(cardName)
        .replaceAll(" ", "-")
        .replaceAll(",", "")
        .normalize("NFD").replace(/\p{Diacritic}/gu, "")

    return "https://edhrec.com/route/?cc=" + edhrecCardName
}

async function scrapeNamedCard(url, cardName, additionalInfo) {
    let result = await scrapeCard(url, additionalInfo)
    if (result.status === "success") {
        result = {
            ...result,
            edhrec_url: getEdhrecUrl(cardName),
            scryfall: {...(await addScryfallCard(cardName))}
        }
    }
    return result
}

async function getNamedCardsRytir(cardName, additionalInfo = {}) {
    const url = exactRytirCardSearchURL(cardName)
    return await scrapeNamedCard(url, cardName, additionalInfo)
}

export default getNamedCardsRytir