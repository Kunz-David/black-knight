import {atomFamily, useRecoilValue} from "recoil";
import {Box, Collapse, VStack} from "@chakra-ui/react";
import CardPrints from "./CardPrints";
import React from "react";
import CardStripOptions from "./CardStripOptions";

export const cardStripVisibleState = atomFamily({
    key: "cardStripVisible",
    default: true,
})

function CardStrip({cardName}) {
    const cardStripVisible = useRecoilValue(cardStripVisibleState(cardName))

    return (
        <VStack width={"full"}>
            <CardStripOptions cardName={cardName}/>
            <Box maxWidth={"100%"}>
                <Collapse in={cardStripVisible} animateOpacity>
                    <Box
                        p={4}
                        mb="3"
                        bg="gray.200"
                        rounded="md"
                        shadow="md"
                    >
                        <CardPrints key={cardName} cardName={cardName}/>
                    </Box>
                </Collapse>
            </Box>
        </VStack>
    )
}

export default CardStrip