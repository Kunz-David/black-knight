import getHTML from "./utils/getHTML";
import getPageURLs from "./utils/getOtherPageURLs";
import scrapeWithAllFunctions from "./scrapeWithAllFunctions";
import scrapedToJsons from "./utils/scrapedToJsons";
import searchSuccessful from "./utils/searchSuccessful";
import addSet from "./addFunctions/addSet"

// scrapes results of search from all the result pages
async function scrapeCard(url, additionalInfo = {}) {
    const html = await getHTML(url)
    if (searchSuccessful(html)) {
        const otherURLs = getPageURLs(html, url)
        const otherHTMLs = await Promise.all(otherURLs.map(getHTML))
        const resultsPageOne = scrapedToJsons(scrapeWithAllFunctions(html))
        const resultsOtherPages = otherHTMLs.map(html => scrapedToJsons(scrapeWithAllFunctions(html))).flat()
        const allResults = resultsPageOne.concat(resultsOtherPages)
        // add set shortcut
        // const sets = addSetCodes(allResults)
        const cards = await Promise.all(
            allResults.map(async card => ({
                ...card,
                ...(await addSet(card, additionalInfo.setsPromise)),
                // setCode: "PLACEHOLDER"
            }
        )))
        return {
            status: "success",
            results: cards,
        }
    } else {
        console.warn(`No card found at ${url}`)
        return {status: "error",
            info: "no cards found"
        }
    }
}

export default scrapeCard