import addScryfallCard from "./rytir/addFunctions/addScryfallCard"
import getNamedCardsNajada from "./najada/getNamedCardsNajada"
import getNamedCardsRytir from "./rytir/getNamedCardsRytir"
import getEdhrecUrl from "./utils/getEdhrecUrl"

async function getNamedCards(cardName, additionalInfo = {}) {
    let rytirResult = await getNamedCardsRytir(cardName, additionalInfo)
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
}

export default getNamedCards