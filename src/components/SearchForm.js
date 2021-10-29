import React, {useState} from 'react';
import {useSetRecoilState,} from 'recoil';
import {cardListAtom} from "../atoms";
import {useQuery} from 'react-query'
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
    const setCardList = useSetRecoilState(cardListAtom)

    // Queries
    // const query = useQuery('card', () => getNamedCardsRytir("Dark Confidant"))
    const query = useQuery("cards", getCardsFromBackend)

    const addCard = () => {

        setCardList((oldCardList) => [
            ...oldCardList,
            {
                // id: generateUniqueID(inputCardName),
                // cardName: inputCardName,

            }
        ])
    }

    const onCardNameInputChange = ({target: {value}}) => {
        setInputCardName(value);
    };

    return (
        <form>
            <label>
                Card:
                <input
                    type="text"
                    name="Search for card..."
                    value={inputCardName}
                    onChange={onCardNameInputChange}
                />
                <button onClick={addCard}>Add</button>
                <br/>
                filled in: {inputCardName}

            </label>
        </form>
    )
}

export default SearchForm;