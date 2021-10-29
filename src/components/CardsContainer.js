import React from 'react';
import {useRecoilValue} from "recoil";
import {cardListAtom} from "../atoms";
import CardItem from "./CardItem";

// const cardsFamily = atomFamily<>()

function CardsContainer(props) {

    const cardList = useRecoilValue(cardListAtom)

    return (
        <div>
            {cardList.map((card) =>
                <CardItem key={card.name} card={card}/>
            )}
        </div>
    );
}

export default CardsContainer;