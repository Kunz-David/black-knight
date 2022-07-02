import { Badge, HStack, StackDivider, Text } from "@chakra-ui/react"
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
    const types =
        typeLine.map(
            face =>
                toLower(face).split(" ").filter(str => cardTypes.includes(str))
        )

    return types
}


function FaceCardTypeIcons({ types, ...manaProps }) {
    return (
        <Badge
            bg={'purple.200'}
            borderRadius={6}>
            <HStack
                spacing={1}
                padding={1}>
                {types.map((type) => {
                    const key = type + nanoid()
                    if (type === "//") {
                        return <b key={key}>  &#8427;  </b>
                    } else {
                        return <ManaSymbol key={key} symbol={type} fixed={true} {...manaProps} />
                    }
                }
                )}
            </HStack>
        </Badge>
    )
}

CardTypeIcons.propTypes = {
    typeLine: PropTypes.arrayOf(PropTypes.string)
}

function CardTypeIcons({ typeLine, ...manaProps }) {

    const faceTypes = getCardTypes(typeLine)

    return (
        <HStack
            marginX={2}
            spacing={1}
            divider={<StackDivider borderColor='gray.500' />}>
            {faceTypes
                .map(types =>
                    <FaceCardTypeIcons key={nanoid()} types={types} {...manaProps} />
                )
            }
        </ HStack>
    )
}

export default CardTypeIcons