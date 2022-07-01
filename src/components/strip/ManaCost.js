import { Text } from "@chakra-ui/react"
import { toLower } from "lodash"
import { nanoid } from 'nanoid'
import ManaSymbol from "../ManaSymbol"
import PropTypes from "prop-types"

function manaList(manaCost) {
    return toLower(manaCost).replaceAll(' // ', '//').split(/\{+|\}+/).filter(e => e)
}

// FIXME: "Golden Guardian // Gold-Forge Garrison" not having cost

function ManaCost({ value, ...manaProps }) {

    const symbols = manaList(value)

    console.log({ value, symbols })

    return (
        <div white-space="nowrap">
            {symbols.map((symbol) => {
                const key = symbol + nanoid()
                if (symbol === "//") {
                    return <b key={key}>  &#8427;  </b>
                } else {
                    return <ManaSymbol key={key} symbol={symbol} cost {...manaProps} />
                }
            }
            )}
        </div>
    )
}

ManaCost.propTypes = {
    value: PropTypes.string
}

export default ManaCost