import {Suspense} from 'react';
import {selectorFamily, useRecoilState, useRecoilValue} from 'recoil';
import {cardListAtom} from "../atoms";
import {MtgCardViewer} from "mtg-card-viewer";
import {findCard} from "./SearchForm";

const CardData = ({cardName}) => {
    return null
    // const card = useRecoilValue(findCard(cardName))
    // return (<div>
    //     <h2>Card info</h2>
    //     <p>Card found: {card.status}</p>
    //     <p>{card.results.toString()}</p>
    // </div>)
}

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
            <input type="checkbox"
                   checked={prop.card.buyCard}
                   onChange={toggleCardBuy}/>
            <button onClick={deleteCard}>X</button>
            {prop.card.name !== undefined && (
                <Suspense fallback={<div>Loading...</div>}>
                    <CardData cardName={prop.card.name}/>
                </Suspense>)}
            {/*<Mana symbol={card.} cost fixed size="2x"/>*/}
        </div>
    );
}


export default CardItem;