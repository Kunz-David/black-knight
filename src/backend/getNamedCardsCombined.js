import addScryfallCard from "./rytir/addFunctions/addScryfallCard"
import getNamedCardsNajada from "./najada/getNamedCardsNajada"
import getNamedCardsRytir from "./rytir/getNamedCardsRytir"
import getEdhrecUrl from "./utils/getEdhrecUrl"

async function getNamedCardsCombined(cardName, additionalInfo = {}) {
    let rytirResult = await getNamedCardsRytir(cardName, additionalInfo)
    let najadaResult = await getNamedCardsNajada(cardName)

    let result = {status: "error"}
    if (rytirResult.status === "success" || najadaResult.status === "success") {
        result = {
            status: "success",
            rytir_url: rytirResult.rytir_url,
            cards: [
                ...(najadaResult.status === "success" && najadaResult.cards),
                ...(rytirResult.status === "success" && rytirResult.cards),
            ],
            edhrec_url: getEdhrecUrl(cardName),
            scryfall: { ...(await addScryfallCard(cardName)) }
        }
    }

    return result
}

export default getNamedCardsCombined