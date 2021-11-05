import React, {Suspense, useEffect} from 'react';
import {atom, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue,} from 'recoil';
import {cardStripsNamesState, cardStripsState} from "../atoms";
import {DEFAULT_HOST} from "../utils/constants/backendHost";
import {DEFAULT_BACKEND_PORT} from "../utils/constants/backendPort";
import {expandedAccordionItemsState} from "./CardStripsContainer";

async function getCardsFromBackend(cardName) {
    const host = DEFAULT_HOST || "http://172.20.5.160:"
    const url = host + DEFAULT_BACKEND_PORT + `/api/card/${cardName}`
    console.log("search url: " + url.replace(" ", "%20"))
    return await fetch(url).then((res) => res.json())
}

export const findCard = selectorFamily({
    key: "cardName",
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
    const insertElement = useRecoilCallback(
        ({set}) => (results) => {
            if (results.status === "success") {
                // add card strip name
                set(cardStripsNamesState, (list) => [...list, cardName])
                // set expanded accordion states
                set(expandedAccordionItemsState, (list) => [0, ...list.map(id => id + 1)])
                // add card strip
                set(cardStripsState(cardName), (val) => ({
                    name: cardName,
                    cards: val.map(item => ({
                        ...item,
                        name: cardName,
                        buyAmount: 0,
                        info: "some placeholder info",
                    })),
                }))
                console.log("Card Strip added: " + cardName)
            }
        },
        [cardName],
    )
    // insertElement(results)
    useEffect(() => insertElement(results), [insertElement, results])
    return (<div>
        {results.toString()}
    </div>)

}


function SearchForm() {
    // card name
    const [inputCardName, setInputCardName] = useRecoilState(inputCardNameState)
    const [searchCardName, setSearchCardName] = useRecoilState(searchCardNameState)

    const addCard = event => {
        event.preventDefault()
        setSearchCardName(inputCardName)
        setInputCardName("")
    }

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
                    required={true}
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