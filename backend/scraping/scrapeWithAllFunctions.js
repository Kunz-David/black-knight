import scrapeWithFunction from "./scrapeWithFunction";
import findFunctions from "./findFunctions/findFunctions";

function scrapeWithAllFunctions(html) {
    const funs = Object.values(findFunctions)
    return funs.map(fun => scrapeWithFunction(html, fun))
}

export default scrapeWithAllFunctions