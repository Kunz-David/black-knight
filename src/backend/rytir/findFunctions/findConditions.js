import findWebNames from "./findWebNames"
import fillEmptyWith from "./utils/fillEmptyWith"
import cardConditions from "../../../utils/cardConditions"

function findConditions(html) {
    const names = findWebNames(html)
    const foundConditions = names.map(name => Object
        .keys(cardConditions)
        .find(condition => name.includes(cardConditions[condition].rytirSearchPhrase)))
    return fillEmptyWith(foundConditions, "NM")
}

export default findConditions