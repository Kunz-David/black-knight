import React from 'react';
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import {selector, useRecoilTransaction_UNSTABLE, useSetRecoilState} from "recoil";
import {
    cardPrintsState,
    cardStripInfoProperty,
    cardStripInfoState,
    cardStripPrintIdsState,
    cardStripsNamesState
} from "../atoms";
import {DeleteIcon} from "@chakra-ui/icons";
import {BsDashSquareFill, BsPlusSquareFill} from "react-icons/all";
import {searchCardNameState} from "./header/SearchForm";


const visibilityAll = selector({
    key: "visibilityAll",
    get: () => [],
    set: ({get, set}, visible) => {
        const cardNames = get(cardStripsNamesState)
        cardNames.forEach(cardName => {
            set(cardStripInfoProperty({cardName, path: "visible"}), visible)
        })
    }
})


const CardStripsOperationsMenu = () => {

    const setVisibilityAll = useSetRecoilState(visibilityAll)

    const destroyAllStrips = useRecoilTransaction_UNSTABLE(({get, reset}) => () => {
        const cardStripNames = get(cardStripsNamesState)
        cardStripNames.forEach(
            cardName => {
                get(cardStripPrintIdsState(cardName)).forEach(
                    // reset prints
                    printId => reset(cardPrintsState({cardName, printId}))
                )
                // reset print ids
                reset(cardStripPrintIdsState(cardName))
                // reset strip info
                reset(cardStripInfoState(cardName))
            }
        )
        // reset names
        reset(cardStripsNamesState)
        // reset searchCard
        reset(searchCardNameState)
    }, [])

    const expand = (event) => {
        setVisibilityAll(true)
        console.debug("expand all")
    }

    const collapse = (event) => {
        setVisibilityAll(false)
        console.debug("collapse all")
    }

    return (
        <Flex>
            <Box p="2">
                <Heading size="md">Your Search</Heading>
            </Box>
            <Spacer />
            <Box>
                <Button leftIcon={<BsPlusSquareFill />} colorScheme="teal" mr="3" onClick={expand} variant="ghost">
                    Expand All
                </Button>
                <Button leftIcon={<BsDashSquareFill />} colorScheme="teal" mr="3" variant="ghost" onClick={collapse}>
                    Collapse All
                </Button>
                <Button leftIcon={<DeleteIcon />} mr="2" colorScheme="red" variant="outline" onClick={destroyAllStrips}>
                    Remove All
                </Button>
            </Box>
        </Flex>
    );
};

export default CardStripsOperationsMenu;
