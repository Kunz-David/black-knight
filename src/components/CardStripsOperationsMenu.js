import React from 'react';
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import {selector, useRecoilCallback, useSetRecoilState} from "recoil";
import {
    cardStripInfoProperty,
    cardStripsNamesState
} from "../atoms";
import {DeleteIcon} from "@chakra-ui/icons";
import {BsDashSquareFill, BsPlusSquareFill} from "react-icons/all";
import {searchCardNameState} from "./header/SearchForm";
import {useDestroyStrip} from "../utils/destroyStrip";


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
    const destroyStrip = useDestroyStrip()

    const destroyAllStrips = useRecoilCallback(({snapshot: {getLoadable}, reset}) => () => {
        const cardStripNames = getLoadable(cardStripsNamesState).contents
        cardStripNames.forEach(
            cardName => {
                destroyStrip(cardName)
            }
        )
        // reset names
        reset(cardStripsNamesState)
        // reset searchCard
        reset(searchCardNameState)
    })

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
