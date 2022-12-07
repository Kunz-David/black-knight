import findWebNames from "./findWebNames"
import cardLanguages from "../../../utils/cardLanguages"
import fillEmptyWith from "./utils/fillEmptyWith"


function findLanguages(html) {
    const names = findWebNames(html)
    const foundLanguages = names.map(name => Object
        .keys(cardLanguages)
        .find(language => name.includes(cardLanguages[language].rytirSearchPhrase)))
    return fillEmptyWith(foundLanguages, "English")
}

export default findLanguages