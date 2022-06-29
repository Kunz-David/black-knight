import { Text } from "@chakra-ui/react"
import { toLower } from "lodash"
import { nanoid } from 'nanoid'
import ManaSymbol from "../ManaSymbol"

function manaList(manaCost) {
    return toLower(manaCost).split(/\{+|\}+/).filter(e => e)
}


function ManaCost({ value, ...manaProps }) {

    const symbols = manaList(value)

    return (
        <Text>
            {symbols.map((symbol) =>
                <ManaSymbol key={symbol + nanoid()} symbol={symbol} cost {...manaProps} />
            )}
        </Text>
    )
}

export default ManaCost