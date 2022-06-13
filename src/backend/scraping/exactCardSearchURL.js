// replace ' and + in the url
function makeItRytirReadable(url) {
    var rytirUrl = url
        .replaceAll("+", "%20")
        .replaceAll("%27", "%B4")
        .replaceAll("%C3%BB", "u")
        .replaceAll("%C3%A9", "%E9")
        .replaceAll("%C3%A1", "a")
        .replaceAll("%C3%B6", "o")
        .replaceAll("%C3%BA", "u")
        .replaceAll("%C3%AD", "i")
        .replaceAll("%C3%A2", "a")
        .replaceAll("%C3%A0", "?")
        .replaceAll("%C2%AE", "%AE")
        .replaceAll("The%20Ultimate%20Nightmare%20of%20Wizards%20of%20the%20Coast%C2%AE%20Customer%20Service",
        "The%20Ultimate%20Nightmare%20of%20Wizards%20of%20the%20Coast%AE%20Cu")
        
    return rytirUrl
}


function exactRytirCardSearchURL(cardName) {
    let rytirSearchJSON = {
        "akce": 3,
        "searchtype": "card",
        "searchname": cardName
    }
    const rytirSearchParams = new URLSearchParams(rytirSearchJSON)
    return makeItRytirReadable("https://cernyrytir.cz/index.php3?" + rytirSearchParams)
}

export default exactRytirCardSearchURL