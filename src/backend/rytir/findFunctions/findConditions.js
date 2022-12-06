import findWebNames from "./findWebNames"
import fillEmptyWith from "./utils/fillEmptyWith"
import cardConditionsRytirSearch from "./utils/cardConditionsRytirSearch"


function findConditions(html) {
    const names = findWebNames(html)
    const foundConditions = names.map(name => Object
        .keys(cardConditionsRytirSearch)
        .find(treatment => name.includes(cardConditionsRytirSearch[treatment].searchPhrase)))
    return fillEmptyWith(foundConditions, "Near Mint")
}

export default findConditions