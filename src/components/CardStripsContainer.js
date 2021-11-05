import React from 'react';
import {atom, useRecoilState, useRecoilValue} from "recoil";
import {cardStripsNamesState} from "../atoms";
import CardStrip from "./CardStrip";
import {Accordion} from "@chakra-ui/react";


export const expandedAccordionItemsState = atom({
    key: "expandedAccordionItems",
    default: [],
})

function CardStripsContainer(props) {

    const cardStripsNames = useRecoilValue(cardStripsNamesState)
    const [expandedAccordionItems, setExpandedAccordionItems] = useRecoilState(expandedAccordionItemsState)

    console.log("cardStripsNames: " + cardStripsNames)
    console.log("cardStripsNames len: " + cardStripsNames.length)

    return (
        <div>
            <Accordion defaultIndex={expandedAccordionItems} index={expandedAccordionItems} allowMultiple onChange={setExpandedAccordionItems}>
                {cardStripsNames.slice().reverse().map((cardName) => <CardStrip key={cardName} cardName={cardName}/>)}
            </Accordion>
        </div>
    );
}

export default CardStripsContainer;