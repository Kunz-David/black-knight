function exactCardSearchURL(cardName) {
    let rytirSearchJSON = {
        "akce": 3,
        "searchtype": "card",
        "searchname": cardName
    }
    const rytirSearchParams = new URLSearchParams(rytirSearchJSON)
    return ("http://cernyrytir.cz/index.php3?" + rytirSearchParams).replace("+", "%20")
}

export default exactCardSearchURL