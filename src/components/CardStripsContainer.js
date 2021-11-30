import React from 'react';
import {useRecoilValue} from "recoil";
import {cardStripsNamesState} from "../atoms";
import {VStack} from "@chakra-ui/react";
import CardStrip from "./CardStrip";

function CardStripsContainer() {
    const cardStripsNames = useRecoilValue(cardStripsNamesState)

    console.debug("cardStripsNames: " + cardStripsNames)
    console.debug("cardStripsNames len: " + cardStripsNames.length)

    return (
        <VStack spacing={0}>
            {cardStripsNames.map((cardName) => <CardStrip key={cardName} cardName={cardName}/>)}
        </VStack>
    );
}

export default CardStripsContainer;