import findWebNames from "./findWebNames";
import cardConditions from "../../../utils/cardConditions";
import fillEmptyWith from "./utils/fillEmptyWith";


function findTreatments(html) {
    const names = findWebNames(html)
    const foundConditions = names.map(name => Object
        .keys(cardConditions)
        .find(treatment => name.includes(cardConditions[treatment].searchPhrase)))
    return fillEmptyWith(foundConditions, "near mint")
}

export default findTreatments