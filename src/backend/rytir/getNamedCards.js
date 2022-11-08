import exactRytirCardSearchURL from "./exactRytirCardSearchURL"
import scrapeCard from "./scrapeCard"
import { toLower } from "lodash"
import addScryfallCard from "./addFunctions/addScryfallCard"
import getNamedCardsNajada from "../najada/getNamedCardsNajada"

function getEdhrecUrl(cardName) {
    let edhrecCardName = toLower(cardName)
        .replaceAll(" ", "-")
        .replaceAll(",", "")
        .normalize("NFD").replace(/\p{Diacritic}/gu, "")

    return "https://edhrec.com/route/?cc=" + edhrecCardName
}

async function scrapeNamedCardRytir(url, cardName, additionalInfo) {
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

async function getNamedCards(cardName, additionalInfo = {}) {
    const url = exactRytirCardSearchURL(cardName)

    let rytirResult = await scrapeCard(url, additionalInfo)
    let najadaResult = await getNamedCardsNajada(cardName)

    let result = {status: "error"}
    if (rytirResult.status === "success" || najadaResult.status === "success") {
        result = {
            status: "success",
            results: {
                rytir: rytirResult.status === "success" ?
                    {
                    url: rytirResult.rytir_url,
                    cards: rytirResult.cards
                } : null,
                najada: najadaResult.status === "success" ?
                    {
                        // url: najadaResult.url,
                        cards: najadaResult.cards
                    } : null,
            },
            edhrec_url: getEdhrecUrl(cardName),
            scryfall: { ...(await addScryfallCard(cardName)) }
        }
    }

    return result
    // return await scrapeNamedCardRytir(url, cardName, additionalInfo)
}

export default getNamedCards