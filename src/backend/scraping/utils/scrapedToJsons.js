import findFunctions from "../findFunctions/findFunctions";
import toObject from "./toObject";

const transpose = m => m[0].map((x, i) => m.map(x => x[i]))

function scrapedToJsons(scrapedData) {
    const cardArrays = transpose(scrapedData)
    let cards = []
    for (const k in cardArrays) {
        cards.push(
            toObject(Object.keys(findFunctions), cardArrays[k])
        )
    }
    return cards
}

export default scrapedToJsons