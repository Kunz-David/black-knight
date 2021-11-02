import {atom, atomFamily, selectorFamily, DefaultValue} from "recoil";
import {get as loGet, has as loHas, set as loSet} from "lodash"
import produce from 'immer'

export const cardListAtom = atom({
    key: "cardListState",
    default: [
        {name: "Dark Confidant", buyCard: true},
        {name: "Aether Vial", buyCard: false},
        // {name: "Forest", buyCard: false},
        // {name: "Plains", buyCard: false},
    ]
})

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

export const buylistProperty = selectorFamily({
    key: "buylistProperty",

    get: ({cardName, path}) => ({get}) => {
        const cardStrip = get(cardStripsState(cardName))
        return loGet(cardStrip, path)
    },

    set: ({cardName, path}) => ({get, set}, newValue) => {
        const cardStrip = get(cardStripsState(cardName))
        if (!loHas(cardStrip, path)) console.warn(`cardStrip ${cardName} doesnt have the path ${path}.`)
        const newCardStrip = produce(cardStrip, (draft) => {
            loSet(draft, path, newValue)
        })
        set(cardStripsState(cardName), newCardStrip)
    }
})

export const cardStripsState = atomFamily({
    key: "cardStrip",
    default: []
})

export const cardStripsNamesState = atom({
    key: "cardStripsNames",
    default: []
})