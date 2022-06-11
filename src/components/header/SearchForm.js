import React, {Suspense, useEffect} from 'react';
import {
    selector,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';
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
import SearchBar, {autoCompArrowsListSelectionState, inputCardNameState, searchForCardState} from "./SearchBar";
import {toastDefaults} from "../../theme";
import {getAutoCompList} from "../AutocompleteFuzzySort";


async function getCardsFromBackend(cardName) {
    const url = `/api/card/${encodeURIComponent(cardName)}`
    console.debug("search url: " + url)
    return await fetch(url).then((res) => res.json())
}

export const findCard = selectorFamily({
    key: "cardName",
    get: (cardName) => async () => {
        console.log("Searching for " + cardName + " in backend")
        const result = await getCardsFromBackend(cardName)
        if (result.status !== "success" && cardName.includes("/")) {
            var frontSideName = cardName.split("/")[0].trim()
            console.log(`"${cardName}" not found in backend searching for "${frontSideName}"`)
            return await getCardsFromBackend(frontSideName)
        }
        return result
    }
})

// returns the inputed card or the selected card in autocomplete
export const searchCardNameState = selector({
    key: "searchCardName",
    get: ({get}) => {
        if (get(autoCompArrowsListSelectionState) === -1) {
            // return get(inputCardNameState)
            // return getAutoCompList(get(inputCardNameState))?[0].target ?? "No card found"
            return getAutoCompList(get(inputCardNameState))[0].target ?? "No card found"
        } else {
            return getAutoCompList(get(inputCardNameState))[get(autoCompArrowsListSelectionState)].target
        }
    }
})


function SearchResults() {

    const cardName = useRecoilValue(searchCardNameState)
    console.debug("in search results with cardname: " + cardName)
    const toast = useToast()
    console.log("cardName is :", cardName)
    const search = useRecoilValue(findCard(cardName))

    const insertElement = useRecoilCallback(
        ({set, snapshot: {getLoadable}, reset}) => (search) => {
            if (search.status === "success") {
                const cardAlreadyOnList = getLoadable(cardStripsNamesState).contents.includes(cardName)
                console.log("cardOnList " + cardAlreadyOnList)
                if (!cardAlreadyOnList) {
                    // save the card to the list
                    set(cardStripsNamesState, val => [cardName, ...val])
                    set(cardStripInfoProperty({cardName, path: "rytirUrl"}), search.rytir_url)
                    set(cardStripInfoProperty({cardName, path: "edhrecUrl"}), search.edhrec_url)
                    set(cardStripInfoProperty({cardName, path: "scryfallUrl"}), search.scryfall.scryfall_uri)
                    set(cardStripInfoProperty({cardName, path: "manaCost"}), search.scryfall.mana_cost)
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

            reset(searchForCardState)
            set(inputCardNameState, "")
            set(autoCompArrowsListSelectionState, -1)
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

    const searchForCard = useRecoilValue(searchForCardState)

    return (
        <div>
            <Flex mb={[1,2,4]}>
                <SearchBar/>
                <SearchOptionsModal />
            </Flex>
            <Suspense fallback={<div>Searching...</div>}>
                {searchForCard === false ?
                    null : <SearchResults/>}
            </Suspense>
        </div>
    )
}

export default SearchForm;