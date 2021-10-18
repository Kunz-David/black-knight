import findWebNames from "./findWebNames";
import cardConditions from "../../../utils/cardConditions";
import fillEmptyWith from "./utils/fillEmptyWith";


function findTreatments(html) {
    const names = findWebNames(html)
    const foundConditions = names.map(name => Object
        .keys(cardConditions)
        .filter(treatment => name.includes(cardConditions[treatment])))
    return fillEmptyWith(foundConditions, "near mint").flat()
}

export default findTreatments