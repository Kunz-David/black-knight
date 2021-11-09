import React from 'react';
import {useRecoilValue} from "recoil";
import {cardStripsNamesState} from "../atoms";
import {VStack} from "@chakra-ui/react";
import CardStrip from "./CardStrip";

function CardStripsContainer() {
    const cardStripsNames = useRecoilValue(cardStripsNamesState)

    console.log("cardStripsNames: " + cardStripsNames)
    console.log("cardStripsNames len: " + cardStripsNames.length)

    return (
        <VStack spacing={0}>
            {cardStripsNames.map((cardName) => <CardStrip key={cardName} cardName={cardName}/>)}
        </VStack>
    );
}

export default CardStripsContainer;