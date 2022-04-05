// replace ' and + in the url
function makeItRytirReadable(url) {
    console.log(url.replace("+", "%20").replace("%27", "%B4"))
    return url.replace("+", "%20").replace("%27", "%B4")
}


function exactCardSearchURL(cardName) {
    let rytirSearchJSON = {
        "akce": 3,
        "searchtype": "card",
        "searchname": cardName
    }
    const rytirSearchParams = new URLSearchParams(rytirSearchJSON)
    return makeItRytirReadable("https://cernyrytir.cz/index.php3?" + rytirSearchParams)
}

export default exactCardSearchURL