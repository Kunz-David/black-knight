import { Divider, Flex, HStack, StackDivider, Text } from "@chakra-ui/react"
import { toLower } from "lodash"
import { nanoid } from 'nanoid'
import ManaSymbol from "../ManaSymbol"
import PropTypes from "prop-types"

function manaList(faceManaCosts) {
    // return toLower(manaCost).replaceAll(' // ', '//').split(/\{+|\}+/).filter(e => e)
    return faceManaCosts.filter(Boolean).map(
        manaCost =>
            toLower(manaCost).split(/\{+|\}+/).filter(e => e)
    )
}

function FaceManaCost({ cost, ...manaProps }) {
    return (
        <HStack
            spacing={1}
            padding={1}>
            {cost.map((symbol) => {
                const key = symbol + nanoid()
                return <ManaSymbol key={key} symbol={symbol} cost shadow fixed={true} {...manaProps} />
            }
            )}
        </HStack>
    )
}


// FIXME: "Golden Guardian // Gold-Forge Garrison" not having cost

function ManaCost({ value, ...manaProps }) {

    const faceCosts = manaList(value)

    return (
        <HStack
            marginX={2}
            spacing={1}
            divider={
                // <hr style={{ "borderRight": "3px" }} />
                // <div style={{
                //     borderLeft: '1px solid',
                //     borderHeight: '10px'
                // }} >
                // </div>
                <Flex height={"full"} paddingY={3} borderColor='gray.400'>
                    <StackDivider />
                </Flex>
                // <Divider orientation='vertical' />
            }>
            {faceCosts
                .map(cost =>
                    <FaceManaCost key={nanoid()} cost={cost} {...manaProps} />
                )
            }
        </ HStack>
    )
}

ManaCost.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string)
}

export default ManaCost