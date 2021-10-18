import findWebNames from "./findWebNames";
import cardLanguages from "../../../utils/cardLanguages";
import fillEmptyWith from "./utils/fillEmptyWith";

function findLanguages(html) {
    const names = findWebNames(html)
    const foundLanguages = names.map(name => Object
        .keys(cardLanguages)
        .filter(treatment => name.includes(cardLanguages[treatment])))
    return fillEmptyWith(foundLanguages, "English").flat()
}

export default findLanguages