function searchSuccessful(html) {
    const notFoundReg = /Zvoleným kritériím neodpovídá žádná karta./
    return html === undefined ? false : html.match(notFoundReg) === null
}

export default searchSuccessful