import {atom, atomFamily, errorSelector, selector, selectorFamily} from "recoil";
import {get as loGet, has as loHas, set as loSet} from "lodash"
import produce from 'immer'

export const log = ({onSet}) => {
    onSet((newValue, oldValue) => {
      console.debug("Changed from ", oldValue, " to ", newValue);
    });
  }

export const persistLocalStorage = ({onSet, setSelf, node}) => {
    const storedData = localStorage.getItem(node.key)
    if (storedData !== null) {
        setSelf(JSON.parse(storedData))
    }

    onSet((newCardStripNames, oldValue, isReset) => {
        if (isReset) {
            localStorage.removeItem(node.key)
        } else
            localStorage.setItem(node.key, JSON.stringify(newCardStripNames))
    })
}

const getPropertySelector = (atom, path, emptyValue) => ({get}) => {
    const value = get(atom)
    if (value === emptyValue) {
        console.warn(`atom ${atom} is empty`)
        return
    }
    if (!loHas(value, path)) {
        console.error(`atom ${atom} doesnt have the path ${path}.`, value)
        return
    }
    // do the work
    return loGet(value, path)
}
const setPropertySelector = (atom, path, emptyValue) => ({get, set}, newValue) => {
    const value = get(atom)
    if (value === emptyValue) {
        console.warn(`atom ${atom} is empty`)
        return
    }
    if (!loHas(value, path)) {
        console.error(`atom ${atom} doesnt have the path ${path}.`, value)
        return
    }
    // do the work
    const newObject = produce(value, (draft) => {
        loSet(draft, path, newValue)
    })
    set(atom, newObject)
}
const getPropertyFamilySelector = (family, key, path, emptyValue) => ({get}) => {
    const value = get(family(key))
    if (value === emptyValue) {
        console.warn("GET: family ", family,  " with ", key, " is empty")
        return
    }
    if (!loHas(value, path)) {
        console.error("GET: family ", family, " with ", key, " doesnt have the path ", path, "value: ", value)
        return
    }
    // do the work
    return loGet(value, path)
}
const setPropertyFamilySelector = (family, key, path, emptyValue) => ({get, set}, newValue) => {
    const value = get(family(key))
    if (value === emptyValue) {
        console.warn("SET: family ", family, " with ", key, " is empty")
        return
    }
    if (!loHas(value, path)) {
        console.error("SET: family ", family, " with ", key, " doesnt have the path ", path, "value: ", value)
        return
    }
    // do the work
    const newObject = produce(value, (draft) => {
        loSet(draft, path, newValue)
    })
    set(family(key), newObject)
}

// Card strip info
const cardStripInfoDefault = {
    visible: true,
    price: undefined,
    rytirUrl: undefined,
    edhrecUrl: undefined,
    scryfallUrl: undefined,
}

export const cardStripInfoState = atomFamily({
    key: "cardStripInfo",
    default: cardStripInfoDefault,
    effects_UNSTABLE: [persistLocalStorage],
})

export const cardStripInfoProperty = selectorFamily({
    key: "cardStripInfoProperty",
    get: ({cardName, path}) =>
        getPropertyFamilySelector(cardStripInfoState, {cardName}, path, undefined),
    set: ({cardName, path}) =>
        setPropertyFamilySelector(cardStripInfoState, {cardName}, path, undefined),
})

// Search options
const searchOptionsDefault = {
    buyAmount: 1,
    orderBy: "Price - Asc.",
}

export const searchState = atom({
    key: "search",
    default: searchOptionsDefault,
})

export const searchProperty = selectorFamily({
    key: "searchProperty",
    get: (path) => getPropertySelector(searchState, path, undefined),
    set: (path) => setPropertySelector(searchState, path, undefined)
})

// Card Print
export const cardPrintProperty = selectorFamily({
    key: "printProperty",
    get: ({cardName, printId, path}) =>
        getPropertyFamilySelector(cardPrintsState, {cardName, printId}, path, cardPrintsStateDefault),
    set: ({cardName, printId, path}) =>
        setPropertyFamilySelector(cardPrintsState, {cardName, printId}, path, cardPrintsStateDefault)
})

const cardPrintsStateDefault = []

// (cardName, printId) => print
export const cardPrintsState = atomFamily({
    key: "prints",
    default: cardPrintsStateDefault,
    effects_UNSTABLE: [persistLocalStorage],
})

// cardName => printIds
export const cardStripPrintIdsState = atomFamily({
    key: "cardStripPrintIds",
    default: [],
    effects_UNSTABLE: [persistLocalStorage],
})

// () => cardNames
export const cardStripsNamesState = atom({
    key: "cardStripsNames",
    default: [],
    effects_UNSTABLE: [persistLocalStorage],
})


// get all cards
const fetchAllCards = async () => {
    const url = '/cards/card_names.json'
    return await fetch(url).then((res) => res.json())
}

export const allCardsState = selector({
    key: "allCards",
    get: async () => await fetchAllCards(),
})
