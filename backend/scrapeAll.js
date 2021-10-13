import findCosts from "./findFunctions/findCosts";
import findStocks from "./findFunctions/findStocks";
import scrape from "./scrape";
import findRarities from "./findFunctions/findRarities";
import findSets from "./findFunctions/findSets";
import findTreatments from "./findFunctions/findTreatments";

const scrapeFunctions = {
    "costs": findCosts,
    "stocks": findStocks,
    "sets": findSets,
    "rarities": findRarities,
    "treatments": findTreatments
}

function scrapeAll(html) {
    // Object.values(scrapeFunctions).map((fun, _) => scrape(html, fun))
    const funs = Object.values(scrapeFunctions)
    return funs.map(fun => scrape(html, fun))

}

export default scrapeAll