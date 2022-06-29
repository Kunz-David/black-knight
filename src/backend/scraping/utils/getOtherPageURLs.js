import getPageCount from "./getPageCount"

// when the results are over multiple pages, get all the pages
function getOtherPageURLs(html, url) {
    const pageCount = getPageCount(html)
    const createNthURL = (n) => url + "&limit=" + (n + 1) * 30

    return [...Array(pageCount - 1).keys()].map(createNthURL)
}

export default getOtherPageURLs