import React from 'react';
import {useRecoilState} from 'recoil';
import {cardListAtom} from "../atoms";
import {MtgCardViewer} from "mtg-card-viewer";

// import {Mana} from "@saeris/react-mana";

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function CardItem(prop) {

    const [todoList, setTodoList] = useRecoilState(cardListAtom);
    const index = todoList.findIndex((listItem) => listItem === prop.card);

    const toggleCardBuy = () => {
        const newList = replaceItemAtIndex(todoList, index, {...prop.card, buyCard: !prop.card.buyCard,});
        setTodoList(newList);
    };

    const deleteCard = () => {
        console.info(`Deleting card: ${prop.card.name}`)
        const newList = removeItemAtIndex(todoList, index);
        setTodoList(newList);
    };

    return (
        <div>
            <MtgCardViewer searchTerm={prop.card.name}/>
            {/*{prop.card.name}*/}
            <input type="checkbox"
                   checked={prop.card.buyCard}
                   onChange={toggleCardBuy}/>
            <button onClick={deleteCard}>X</button>
            {/*<Mana symbol={card.} cost fixed size="2x"/>*/}
        </div>
    );
}


export default CardItem;