import cardTreatments from "../../../utils/cardTreatments";
import findWebNames from "./findWebNames";
import fillEmptyWith from "./utils/fillEmptyWith";

function findTreatments(html) {
    const names = findWebNames(html)
    const foundTreatments = names.map(name => Object
        .keys(cardTreatments)
        .find(treatment => name.includes(cardTreatments[treatment])))
    return fillEmptyWith(foundTreatments, "none")
}

export default findTreatments