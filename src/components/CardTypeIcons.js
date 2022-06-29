import { Text } from "@chakra-ui/react"
import { toLower } from "lodash"
import ManaSymbol from "./ManaSymbol"
import PropTypes from "prop-types"

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

CardTypeIcons.propTypes = {
    typeLine: PropTypes.string.isRequired
}

function CardTypeIcons({ typeLine, ...manaProps }) {

    const types = getCardTypes(typeLine)

    return (
        <Text>
            {types.map((type) => <ManaSymbol key={type} symbol={type} {...manaProps} />)}
        </Text>
    )
}

export default CardTypeIcons