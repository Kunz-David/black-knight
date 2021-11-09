import React, {Suspense, useEffect} from 'react';
import {atom, selectorFamily, useRecoilCallback, useRecoilValue,} from 'recoil';
import {cardStripPrintIdsState, cardStripsNamesState, cardPrintsState} from "../atoms";
import {DEFAULT_HOST} from "../utils/constants/backendHost";
import {DEFAULT_BACKEND_PORT} from "../utils/constants/backendPort";
import {min, range} from "lodash";
import {Flex, useToast} from "@chakra-ui/react";
import SearchOptionsModal from "./SearchOptionsModal";
import SearchBar from "./SearchBar";
import {cardStripPriceState} from "./CardStripOptions";

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

export const searchCardNameState = atom({
    key: "performSearch",
    default: "no card",
})


function SearchResults({sorting}) {

    const cardName = useRecoilValue(searchCardNameState)
    const totalBuyAmount = 1
    console.log("in search results with cardname: " + cardName)
    const toast = useToast()
    const search = useRecoilValue(findCard(cardName))

    const insertElement = useRecoilCallback(
        ({set}) => (search) => {
            if (search.status === "success") {
                const results = search.results
                // save the card to the list
                set(cardStripsNamesState, val => [cardName, ...val])
                // save the count of prints for card
                set(cardStripPrintIdsState(cardName), results.length)
                // fill in the prints
                let buysRemaining = totalBuyAmount
                let cardStripPrice = 0
                range(results.length).forEach((printId) => {
                    const buyAmount = min([results[printId].stock, buysRemaining])
                    cardStripPrice += buyAmount * results[printId].price
                    console.log("cardStripPrice: " + cardStripPrice)
                    buysRemaining = buysRemaining - buyAmount
                    set(cardPrintsState({cardName, printId}),
                        {...results[printId],
                            buyAmount: buyAmount,
                        }
                    )
                })
                // set the price of selected cards
                console.log("setting cardStripPrice: " + cardStripPrice)
                set(cardStripPriceState(cardName), cardStripPrice)
                toast({
                    title: "Card added.",
                    status: "success",
                    isClosable: true,
                    duration: 2000,
                })
            } else {
                toast({
                    title: "Card not found.",
                    status: "error",
                    isClosable: true,
                    duration: 2000,
                })
                console.log(`Card "${cardName}" not found in backend.`)
            }
        },
        [cardName, totalBuyAmount],
    )
    // insertElement(results)
    useEffect(() => insertElement(search), [insertElement, search])
    return (<div>
        {search.status.toString()}
    </div>)

}


function SearchForm() {

    const searchCardName = useRecoilValue(searchCardNameState)

    return (
        <div>
            <Flex>
                <SearchBar/>
                <SearchOptionsModal />
            </Flex>
            <Suspense fallback={<div>Searching...</div>}>
                {searchCardName === "no card" ?
                    null : <SearchResults/>}
            </Suspense>
        </div>
    )
}

export default SearchForm;