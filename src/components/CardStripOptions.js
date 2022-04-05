import React from 'react';
import {Box, Heading, HStack, IconButton, Spacer, Text} from "@chakra-ui/react";
import {useSetRecoilState, useRecoilValue} from "recoil";
import {DeleteIcon} from "@chakra-ui/icons";
import {
    cardStripInfoProperty, cardStripInfoState,
} from "../atoms";
import {useDestroyStrip} from "../utils/destroyStrip";


function CardStripOptions({cardName}) {

    const setCardStripVisible = useSetRecoilState(cardStripInfoProperty({cardName, path: "visible"}))
    const cardStripPrice = useRecoilValue(cardStripInfoProperty({cardName, path: "price"}))
    const cardStripInfo = useRecoilValue(cardStripInfoState(cardName))
    // const cardStripPrice = useRecoilValue(cardStripPriceState(cardName))

    const destroyStrip = useDestroyStrip()


    const handleToggle = () => setCardStripVisible(val => !val)

    return (
        <HStack width={"full"}
                border={"2px solid"}
                borderColor={"gray.300"}
                rounded={"md"}
                onClick={handleToggle}
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
            <IconButton
                icon={<DeleteIcon />}
                aria-label={"Remove card."}
                mr="2" colorScheme="red"
                variant={"ghost"}
                onClick={(event) => {
                    event.stopPropagation()
                    destroyStrip(cardName)
                    console.log("cardStripPrice after destroy", cardStripPrice)
                    console.log("cardStripInfo after destroy", cardStripInfo)
                }} />
        </HStack>
    )
}

export default CardStripOptions;