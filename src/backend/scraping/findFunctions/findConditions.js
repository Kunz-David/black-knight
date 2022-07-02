import findWebNames from "./findWebNames"
import cardConditions from "../../../utils/cardConditions"
import fillEmptyWith from "./utils/fillEmptyWith"


function findConditions(html) {
    const names = findWebNames(html)
    const foundConditions = names.map(name => Object
        .keys(cardConditions)
        .find(treatment => name.includes(cardConditions[treatment].searchPhrase)))
    return fillEmptyWith(foundConditions, "near mint")
}

export default findConditions