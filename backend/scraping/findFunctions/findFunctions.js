import findCosts from "./findCosts";
import findStocks from "./findStocks";
import findSets from "./findSets";
import findRarities from "./findRarities";
import findTreatments from "./findTreatments";
import findLanguages from "./findLanguages";
import findConditions from "./findConditions";
import findWebNames from "./findWebNames";

const findFunctions = {
    "cost": findCosts,
    "stock": findStocks,
    "set": findSets,
    "rarity": findRarities,
    "treatment": findTreatments,
    "language": findLanguages,
    "condition": findConditions,
    "web_name": findWebNames
}

export default findFunctions