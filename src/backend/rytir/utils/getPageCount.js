function getPageCount(html) {
    const multipage = html.match(/Nalezeno [0-9]+/)
    if (multipage === null) {
        return 1
    }
    const cardCount = multipage[0].match(/[0-9]+/)
    return Math.ceil(cardCount / 30)
}

export default getPageCount