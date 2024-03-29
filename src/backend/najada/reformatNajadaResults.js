import cardLanguages from "../../utils/cardLanguages"

function insertIf(condition, ...elements) {
    return condition ? elements : []
}

function keyGivenPhrase(object, location, phrase, def="This should not happen") {
    for (const [key, value] of Object.entries(object)) {
        if (value[location] === phrase)
            return key
    }
    return def
}

function reformatItem(item) {
    return item.articles.map(article => {
        return {
            name: item.localized_name,
            id: article.id,
            price: article.effective_price_czk,
            stock: article.total_availability,
            set: {
                name: item.expansion.localized_name,
                releaseDate: item.expansion.release_date,
                keyruneCode: item.expansion.short_code,
            },
            rarity: item.rarity,
            treatments: [
                ...insertIf(item.additional_properties.is_oversized, "oversize"),
                ...insertIf(article.additional_properties.is_foil, "foil"),
                ...insertIf(article.additional_properties.is_altered, "altered"),
                ...insertIf(article.additional_properties.is_signed, "signed"),
            ],
            language: keyGivenPhrase(cardLanguages, "najadaSearchPhrase", article.language_code),
            condition: article.condition,
            image: item.image_url,
        }
    })
}


function reformatNajadaResults(data) {
    let cards = []
    for (const item of data.results) {
        cards = [
            ...cards,
            ...reformatItem(item)
        ]
    }
    return cards
}

export default reformatNajadaResults