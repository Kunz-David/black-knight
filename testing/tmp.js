const { toLower, uniq } = require("lodash")
const cards = require("./oracle-cards.json")

const cardTypes = [
    "artifact",
    "enchantment",
    "creature",
    "planeswalker",
    "land",
    "plane",
    "phenomenon",
    "scheme",
    "conspiracy",
    "vanguard",
    // "god",
    // "token",
    "instant",
    "sorcery"
]

function getCardTypes(typeLine) {
    const types = toLower(typeLine).split(" ").filter(str => cardTypes.includes(str))
    return uniq(types)
}

for (const ind in cards) {
    const card = cards[ind]
    const cardtypes = getCardTypes(card.type_line)
    if (cardtypes.length > 2) {
        console.log(card.name, cardtypes)
    }
}