import React from 'react';
import {Box, Heading, HStack, Spacer, Text} from "@chakra-ui/react";
import {useSetRecoilState, atomFamily, useRecoilValue} from "recoil";
import {cardStripVisibleState} from "./CardStrip";

export const cardStripPriceState = atomFamily({
    key: "cardStripPrice",
    default: 0,
})

function CardStripOptions({cardName}) {

    const setCardStripVisible = useSetRecoilState(cardStripVisibleState(cardName))
    const cardStripPrice = useRecoilValue(cardStripPriceState(cardName))

    const handleToggle = () => setCardStripVisible(val => !val)

    return (
        <HStack width={"full"}
                border={"2px solid"}
                borderColor={"gray.300"}
                rounded={"md"}
                onClick={handleToggle}
                as={"button"}
                _hover={{ bg: "gray.200" }}
                _focus={{ boxShadow: "inner" }}>
            <Box p="2">
                <Heading size="md">{cardName}</Heading>
            </Box>
            <Spacer/>
            <Box>
                <Text fontWeight={"semibold"}>
                    Cost: {cardStripPrice} Kč
                </Text>
            </Box>
        </HStack>
    )
}

export default CardStripOptions;