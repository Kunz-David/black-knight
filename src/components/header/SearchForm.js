import React, {Suspense, useEffect} from 'react';
import {atom, selectorFamily, useRecoilCallback, useRecoilValue,} from 'recoil';
import {
    cardStripPrintIdsState,
    cardStripsNamesState,
    cardPrintsState,
    searchProperty,
    cardStripInfoProperty
} from "../../atoms";
import {min, range} from "lodash";
import {Flex, useToast} from "@chakra-ui/react";
import SearchOptionsModal from "./SearchOptionsModal";
import SearchBar from "./SearchBar";
import {toastDefaults} from "../../theme";

async function getCardsFromBackend(cardName) {
    const url = `/api/card/${cardName}`
    console.debug("search url: " + url.replace(" ", "%20"))
    return await fetch(url).then((res) => res.json())
}

export const findCard = selectorFamily({
    key: "cardName",
    get: (cardName) => async () => {
        console.log("Searching for " + cardName + " in backend")
        return await getCardsFromBackend(cardName)
    }
})

export const searchCardNameState = atom({
    key: "performSearch",
    default: "no card",
})


function SearchResults() {

    const cardName = useRecoilValue(searchCardNameState)
    console.debug("in search results with cardname: " + cardName)
    const toast = useToast()
    const search = useRecoilValue(findCard(cardName))

    const insertElement = useRecoilCallback(
        ({set, snapshot: {getLoadable}, reset}) => (search) => {
            if (search.status === "success") {
                const cardAlreadyOnList = getLoadable(cardStripsNamesState).contents.includes(cardName)
                console.log("cardOnList " + cardAlreadyOnList)
                if (!cardAlreadyOnList) {
                    // save the card to the list
                    set(cardStripsNamesState, val => [cardName, ...val])
                }

                // get search params:
                const totalBuyAmount = getLoadable(searchProperty("buyAmount")).contents
                const orderBy = getLoadable(searchProperty("orderBy")).contents

                const results = search.results
                // save the count of prints for card
                const ids = orderBy === "Price - Asc." ? range(results.length).reverse() : range(results.length)
                set(cardStripPrintIdsState(cardName), ids)
                // fill in the prints
                let buysRemaining = totalBuyAmount
                let addedCardStripPrice = 0
                ids.forEach((printId) => {
                    const prevBuyAmount = getLoadable(cardPrintsState({cardName, printId})).contents.buyAmount ?? 0
                    const buyAmount = min([results[printId].stock-prevBuyAmount, buysRemaining])
                    addedCardStripPrice += buyAmount * results[printId].price
                    buysRemaining = buysRemaining - buyAmount
                    set(cardPrintsState({cardName, printId}),
                        {...results[printId],
                            buyAmount: buyAmount + prevBuyAmount,
                        }
                    )
                })
                // set the price of selected cards
                const prevCardStripPrice = getLoadable(cardStripInfoProperty({cardName, path: "price"})).contents ?? 0
                set(cardStripInfoProperty({cardName, path: "price"}), prevCardStripPrice + addedCardStripPrice)

                // create description:
                let toastDescription
                let toastStatus
                if (totalBuyAmount > 0) { // did he want to buy
                    toastDescription = `${totalBuyAmount-buysRemaining}/${totalBuyAmount} added for ${addedCardStripPrice} Kč`
                    switch (totalBuyAmount-buysRemaining) {
                        case totalBuyAmount: // bought all
                            toastStatus = "success"
                            break
                        case 0: // bought nothing
                            toastStatus = "error"
                            break
                        default: // some buys remaining
                            toastStatus = "warning"
                    }
                } else {
                    toastDescription = null
                    toastStatus = "success"
                }

                toast({
                    title: `${cardName} added.`,
                    description: toastDescription,
                    status: toastStatus,
                    ...toastDefaults
                })
            } else {
                toast({
                    title: `${cardName} not found.`,
                    status: "error",
                    ...toastDefaults
                })
                console.log(`Card "${cardName}" not found in backend.`)
            }

            // reset search state
            reset(searchCardNameState)

        },
        [cardName],
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
            <Flex mb={[1,2,4]}>
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