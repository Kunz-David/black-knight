import {atom, atomFamily, selectorFamily, selector} from "recoil";
import {get as loGet, has as loHas, set as loSet, range} from "lodash"
import produce from 'immer'
import {searchCardNameState} from "./components/SearchForm";


export const destroyAllStripsSelector = selector({
    key: "destroyAllStrips",
    get: () => [],
    set: ({get, reset}) => {
        const cardStripNames = get(cardStripsNamesState)
        cardStripNames.forEach(
            cardName => {
                range(get(cardStripPrintIdsState(cardName))).forEach(
                    // reset prints
                    printId => reset(cardPrintsState({cardName, printId}))
                )
                // reset print ids
                reset(cardStripPrintIdsState(cardName))
            }
        )
        // reset names
        reset(cardStripsNamesState)
        // reset searchCard
        reset(searchCardNameState)
    }
})


export const searchState = atom({
    key: "search",
    default: {
        buyAmount: 0,
        orderBy: "Price - Asc.",
    }
})

// NEW MODE:
export const searchProperty = selectorFamily({
    key: "searchProperty",

    get: ({path}) => ({get}) => {
        const search = get(searchState)
        if (!loHas(search, path)) console.debug(`search doesnt have the path ${path}.`)
        return loGet(search, path)
    },

    set: ({path}) => ({get, set}, newValue) => {
        const search = get(searchState)
        if (!loHas(search, path)) console.debug(`search doesnt have the path ${path}.`)
        const newSearch = produce(search, (draft) => {
            loSet(draft, path, newValue)
        })
        set(searchState, newSearch)
    }
})



export const cardPrintProperty = selectorFamily({
    key: "printProperty",

    get: ({cardName, printId,  path}) => ({get}) => {
        const cardPrint = get(cardPrintsState({cardName, printId}))
        if (!loHas(cardPrint, path)) console.error(`cardStrip ${cardName} doesnt have the path ${path}.`)
        return loGet(cardPrint, path)
    },

    set: ({cardName, printId, path}) => ({get, set}, newValue) => {
        const cardPrint = get(cardPrintsState({cardName, printId}))
        if (!loHas(cardPrint, path)) console.error(`cardStrip ${cardName} doesnt have the path ${path}.`)
        const newCardPrint = produce(cardPrint, (draft) => {
            loSet(draft, path, newValue)
        })
        set(cardPrintsState({cardName, printId}), newCardPrint)
    }
})

// (cardName, printId) => print
export const cardPrintsState = atomFamily({
    key: "prints",
    default: []
})

// cardName => len(printIds)
export const cardStripPrintIdsState = atomFamily({
    key: "cardStripPrintIds",
    default: []
})

// () => cardNames
export const cardStripsNamesState = atom({
    key: "cardStripsNames",
    default: []
})