import React from 'react';
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {expandedAccordionItemsState} from "./CardStripsContainer";
import {cardStripsNamesState, destroyAllStripsSelector} from "../atoms";
import {DeleteIcon} from "@chakra-ui/icons";
import {range} from "lodash"
import {BsDashSquareFill, BsPlusSquareFill} from "react-icons/all";


const CardStripsOperationsMenu = () => {

    const cardStripNames = useRecoilValue(cardStripsNamesState)
    const setExpandedAccordionItems = useSetRecoilState(expandedAccordionItemsState)
    const destroyAllStrips = useSetRecoilState(destroyAllStripsSelector)

    const expand = (event) => {
        setExpandedAccordionItems(range(cardStripNames.length))
    }

    const collapse = (event) => {
        setExpandedAccordionItems([])
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
