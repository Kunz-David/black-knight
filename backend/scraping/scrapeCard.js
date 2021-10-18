import getHTML from "./utils/getHTML";
import getPageURLs from "./utils/getOtherPageURLs";
import scrapeWithAllFunctions from "./scrapeWithAllFunctions";
import scrapedToJsons from "./utils/scrapedToJsons";
import searchSuccessful from "./utils/searchSuccessful";

// scrapes results of search from all the result pages
async function scrapeCard(url) {
    const html = await getHTML(url)
    if (searchSuccessful(html)) {
        const otherURLs = getPageURLs(html, url)
        const otherHTMLs = await Promise.all(otherURLs.map(getHTML))
        const resultsPageOne = scrapedToJsons(scrapeWithAllFunctions(html))
        const resultsOtherPages = otherHTMLs.map(html => scrapedToJsons(scrapeWithAllFunctions(html))).flat()
        const allResults = resultsPageOne.concat(resultsOtherPages)
        return {
            status: "Success.",
            results: allResults,
        }
    } else {
        console.warn(`No card found at ${url}`)
        return {status: "Error: No cards found."}
    }
}

export default scrapeCard