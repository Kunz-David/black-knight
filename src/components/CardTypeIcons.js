import { Text } from "@chakra-ui/react"
import { toLower, uniq } from "lodash"
import ManaSymbol from "./ManaSymbol"
import PropTypes from "prop-types"
import { nanoid } from "nanoid"

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
    "token",
    "instant",
    "sorcery"
]

function getCardTypes(typeLine) {
    const types = toLower(typeLine)
        .split("//").map(
            face =>
                face.split(" ").filter(str => cardTypes.includes(str))
        )

    return types
}

CardTypeIcons.propTypes = {
    typeLine: PropTypes.string
}

function FaceCardTypeIcons({ types, ...manaProps }) {
    return (
        <div white-space="nowrap">
            {types.map((type) => {
                const key = type + nanoid()
                if (type === "//") {
                    return <b key={key}>  &#8427;  </b>
                } else {
                    return <ManaSymbol key={key} symbol={type} fixed={true} {...manaProps} />
                }
            }
            )}
        </div>
    )
}


// FIXME: "Hostile Hostel // Creeping Inn" having 3 types

function CardTypeIcons({ typeLine, ...manaProps }) {

    const faceTypes = getCardTypes(typeLine)

    return (
        <div white-space="nowrap">
            {faceTypes
                .map(types =>
                    <FaceCardTypeIcons key={nanoid()} types={types} {...manaProps} />
                )
            }
        </div>
    )
}

export default CardTypeIcons