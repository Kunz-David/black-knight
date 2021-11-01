import React, {useState} from 'react';
import {useRecoilState, useSetRecoilState,} from 'recoil';
import {cardListAtom} from "../atoms";
// import {useQuery} from 'react-query'
import axios from "axios";
import {DEFAULT_BACKEND_HOST} from "../utils/constants/backendHost";
import {DEFAULT_BACKEND_PORT} from "../utils/constants/backendPort";

async function getCardsFromBackend(cardName) {
    return await axios.get(
        DEFAULT_BACKEND_HOST + ":" + DEFAULT_BACKEND_PORT + `/api/card/${cardName}`
    )
}

function SearchForm() {
    // card name
    const [inputCardName, setInputCardName] = useState("")
    // card list setter
    const [cardList, setCardList] = useRecoilState(cardListAtom)

    // Queries
    // const query = useQuery('card', () => getCardsFromBackend("Lightning bolt"))
    // const query = useQuery("cards", getCardsFromBackend)

    const addCard = event => {
        event.preventDefault()
        setCardList((oldCardList) => [
            ...oldCardList,
            {
                name: inputCardName,
                buyCard: true,
            }
        ])
        setInputCardName("")
        console.log("list updated:" + cardList.toString())
    }

    const onCardNameInputChange = ({target: {value}}) => {
        setInputCardName(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addCard(event)
        }
    }

    return (
        <form>
            <label>
                Card:
                <input
                    type="text"
                    name="Search for card..."
                    value={inputCardName}
                    onChange={onCardNameInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={addCard}>Add</button>
                <br/>
                filled in: {inputCardName}

            </label>
        </form>
    )
}

export default SearchForm;