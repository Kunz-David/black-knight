import { toLower } from "lodash";

const cardTypes = [
    "artifact",
    "enchantment",
    "creature",
    "planeswalker",
    "god",
    "token",
    "instant",
    "sorcery",
    "saga",
    "class",
]

function getCardTypes(typeLine) {
    const types = toLower(typeLine).split(" ").filter(str => cardTypes.includes(str))
    return types
}

function CardTypeIcons({ typeLine, ...manaProps}) {

    const types = getCardTypes(typeLine)
    
    return (
        <Text>
            {types.map((type) => <ManaIcon key={type} symbol={type} {...manaProps}/>)}
        </Text>
    )
}

export default CardTypeIcons;