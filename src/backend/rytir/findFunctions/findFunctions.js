import findPrices from "./findPrices"
import findStocks from "./findStocks"
import findSets from "./findSets"
import findRarities from "./findRarities"
import findTreatments from "./findTreatments"
import findLanguages from "./findLanguages"
import findConditions from "./findConditions"
import findWebNames from "./findWebNames"
import findImages from "./findImages"

const findFunctions = {
    "name": findWebNames,
    "price": findPrices,
    "stock": findStocks,
    "rytir_set": findSets,
    "rarity": findRarities,
    "treatments": findTreatments,
    "language": findLanguages,
    "condition": findConditions,
    "image": findImages
}

export default findFunctions