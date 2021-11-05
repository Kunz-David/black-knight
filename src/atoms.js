import {atom, atomFamily, selectorFamily, selector} from "recoil";
import {get as loGet, has as loHas, set as loSet} from "lodash"
import produce from 'immer'
import {findCard} from "./components/SearchForm";

export const cardListAtom = atom({
    key: "cardListState",
    default: [
        {name: "Dark Confidant", buyCard: true},
        {name: "Aether Vial", buyCard: false},
        // {name: "Forest", buyCard: false},
        // {name: "Plains", buyCard: false},
    ]
})

// noinspection JSUnusedGlobalSymbols
export const defaultCard = {
    cardName: null,
    cost: null,
    stock: null,
    condition: "Near mint",
    language: "English",
    img: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/revision/latest/scale-to-width-down/745?cb=20140813141013",
    rarity: null,
    buyCount: 0,
}

export const cardStripProperty = selectorFamily({
    key: "cardStripProperty",

    get: ({cardName, path}) => ({get}) => {
        const cardStrip = get(cardStripsState(cardName))
        if (!loHas(cardStrip, path)) console.debug(`cardStrip ${cardName} doesnt have the path ${path}.`)
        return loGet(cardStrip, path)
    },

    set: ({cardName, path}) => ({get, set}, newValue) => {
        const cardStrip = get(cardStripsState(cardName))
        if (!loHas(cardStrip, path)) console.debug(`cardStrip ${cardName} doesnt have the path ${path}.`)
        const newCardStrip = produce(cardStrip, (draft) => {
            loSet(draft, path, newValue)
        })
        set(cardStripsState(cardName), newCardStrip)
    }
})

// export const populateCardStrip = selectorFamily({
//     key: "populateCardsStrip",
//     set: ({cardName}) => ({get, set}) => {
//         const cardStrip = get(cardStripsState(cardName))
//         const foundResults = get(findCard(cardName))
//         set(cardStrip, foundResults.results)
//     }
// })

export const destroyAllStripsSelector = selector({
    key: "destroyAllStrips",
    get: () => [],
    set: ({get, reset}) => {
        const cardStripNames = get(cardStripsNamesState)
        cardStripNames.forEach(
            name => reset(cardStripsState(name))
        )
        reset(cardStripsNamesState)
    }
})

export const cardStripsState = atomFamily({
    key: "cardStrip",
    default: selectorFamily({
        key: "cardStripDefault",
        get: (cardName) => ({get}) => {
            const foundResults = get(findCard(cardName))
            return foundResults.results
        }
    })
})

export const cardStripsNamesState = atom({
    key: "cardStripsNames",
    default: []
})