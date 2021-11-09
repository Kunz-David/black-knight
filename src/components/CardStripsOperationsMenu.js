import React from 'react';
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import {selector, useSetRecoilState} from "recoil";
import {cardStripsNamesState, destroyAllStripsSelector} from "../atoms";
import {DeleteIcon} from "@chakra-ui/icons";
import {BsDashSquareFill, BsPlusSquareFill} from "react-icons/all";
import {cardStripVisibleState} from "./CardStrip";


const visibilityAll = selector({
    key: "visibilityAll",
    get: () => [],
    set: ({get, set}, visible) => {
        const cardNames = get(cardStripsNamesState)
        cardNames.forEach(cardName => {
            set(cardStripVisibleState(cardName), visible)
        })
    }
})


const CardStripsOperationsMenu = () => {

    // const cardStripNames = useRecoilValue(cardStripsNamesState)
    const setVisibilityAll = useSetRecoilState(visibilityAll)
    const destroyAllStrips = useSetRecoilState(destroyAllStripsSelector)

    const expand = (event) => {
        setVisibilityAll(true)
        console.log("expand all")
    }

    const collapse = (event) => {
        setVisibilityAll(false)
        console.log("collapse all")
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
                <Button leftIcon={<BsDashSquareFill />} colorScheme="teal" mr="3" variant="ghost" onClick={collapse}>Collapse All</Button>
                <Button leftIcon={<DeleteIcon />} mr="2" colorScheme="red" variant="outline" onClick={destroyAllStrips}>
                    Remove
                </Button>
            </Box>
        </Flex>
    );
};

export default CardStripsOperationsMenu;
