import React, {Suspense} from 'react';
import {atom, selectorFamily, useRecoilState, useRecoilValue,} from 'recoil';
import {cardListAtom} from "../atoms";
import {DEFAULT_HOST} from "../utils/constants/backendHost";
import {DEFAULT_BACKEND_PORT} from "../utils/constants/backendPort";

async function getCardsFromBackend(cardName) {
    const url = DEFAULT_HOST + DEFAULT_BACKEND_PORT + `/api/card/${cardName}`
    console.log("search url: " + url.replace(" ", "%20"))
    return await fetch(url).then((res) => res.json())
}

export const findCard = selectorFamily({
    key: "card",
    get: (cardName) => async () => {
        console.log("cardname in findcard: " + cardName)
        return await getCardsFromBackend(cardName)
    }
})

const inputCardNameState = atom({
    key: "inputCardName",
    default: "",
})

const searchCardNameState = atom({
    key: "performSearch",
    default: "no card",
})

function SearchResults({cardName}) {
    const results = useRecoilValue(findCard(cardName))
    return (<div>
        {results.toString()}
    </div>)

}


function SearchForm() {
    // card name
    const [inputCardName, setInputCardName] = useRecoilState(inputCardNameState)
    const [searchCardName, setSearchCardName] = useRecoilState(searchCardNameState)
    // card list setter
    const [cardList, setCardList] = useRecoilState(cardListAtom)

    const addCard = event => {
        event.preventDefault()
        setSearchCardName(inputCardName)
        setInputCardName("")
        setCardList((oldCardList) => [
            ...oldCardList,
            {
                name: inputCardName,
                buyCard: true,
            }
        ])
        console.log("list updated:" + cardList.toString())
    }

    const onCardNameInputChange = ({target: {value}}) => {
        console.log(value)
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
                    onChange={({target: {value}}) => setInputCardName(value)}
                    onKeyDown={handleKeyDown}
                />
                <button type={"button"} onClick={addCard}>Add</button>
                <br/>
                filled in: {inputCardName}
            </label>
            <Suspense fallback={<div>Searching...</div>}>
                {searchCardName === "no card" ? <div>[empty placeholder]</div> : <SearchResults cardName={searchCardName}/>}
            </Suspense>
        </form>
    )
}

export default SearchForm;