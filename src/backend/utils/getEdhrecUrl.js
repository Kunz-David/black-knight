import {toLower} from "lodash"

function getEdhrecUrl(cardName) {
    let edhrecCardName = toLower(cardName)
        .replaceAll(" ", "-")
        .replaceAll(",", "")
        .normalize("NFD").replace(/\p{Diacritic}/gu, "")

    return "https://edhrec.com/route/?cc=" + edhrecCardName
}

export default getEdhrecUrl