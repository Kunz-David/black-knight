import React from 'react';
import {Box, Heading, HStack, IconButton, Spacer, Text} from "@chakra-ui/react";
import {useSetRecoilState, atomFamily, useRecoilValue, useRecoilTransaction_UNSTABLE} from "recoil";
import {DeleteIcon} from "@chakra-ui/icons";
import {
    cardPrintsState,
    cardStripInfoProperty, cardStripInfoState,
    cardStripPrintIdsState,
    cardStripsNamesState,
    persistLocalStorage
} from "../atoms";
import {searchCardNameState} from "./header/SearchForm";

export const cardStripPriceState = atomFamily({
    key: "cardStripPrice",
    default: 0,
    effects_UNSTABLE: [persistLocalStorage],
})

function CardStripOptions({cardName}) {

    const setCardStripVisible = useSetRecoilState(cardStripInfoProperty({cardName, path: "visible"}))
    const cardStripPrice = useRecoilValue(cardStripInfoProperty({cardName, path: "price"}))
    // const cardStripPrice = useRecoilValue(cardStripPriceState(cardName))

    const destroyStrip = useRecoilTransaction_UNSTABLE(({get, set, reset}) => (cardName) => {
        get(cardStripPrintIdsState(cardName)).forEach(
            // reset prints
            printId => reset(cardPrintsState({cardName, printId}))
        )
        // print ids
        reset(cardStripPrintIdsState(cardName))
        // strip info
        reset(cardStripInfoState(cardName))
        // delete strip name
        set(cardStripsNamesState, ((values) => values.filter(name => name !== cardName)))
        // reset searchCard
        reset(searchCardNameState)
    },[cardName])


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
                    destroyStrip(cardName)}} />
        </HStack>
    )
}

export default CardStripOptions;