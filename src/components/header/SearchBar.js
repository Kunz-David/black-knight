import { SearchIcon } from "@chakra-ui/icons"
import { Flex, Input, InputGroup, InputLeftElement, useToast, VStack } from "@chakra-ui/react"
import { has, max, min, range } from "lodash"
import { atom, selector, selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import AutocompleteFuzzySort, { getAutoCompList } from './AutocompleteFuzzySort'
import { toastDefaults } from "../../theme"
import { cardPrintsState, cardStripInfoProperty, cardStripPrintIdsState, cardStripsNamesState, searchProperty } from "../../atoms"
import { getFaceObject } from "../../utils/cardFaceHelpers"

export const inputCardNameState = atom({
    key: "inputCardName",
    default: "",
    effects: []
})

export async function getCardsFromBackend(cardName) {
    const url = `/api/rytir_legacy/${encodeURIComponent(cardName)}`
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
    get: ({ get }) => {
        const autoCompList = getAutoCompList(get(inputCardNameState))
        if (autoCompList?.length === 0) {
            return "No card found"
        } else if (get(autoCompListSelectionState) === -1) {
            return autoCompList[0].target ?? "No card found"
        } else {
            return autoCompList[get(autoCompListSelectionState)].target
        }
    }
})

// selection from the autocomplete list
export const autoCompListSelectionState = atom({
    key: "autoCompListSelectionState",
    default: -1,
})


export const searchCardState = selector({
    key: "searchCardState",
    get: ({ getCallback }) => {

        const faceKeys = [
            "name",
            "mana_cost",
            "type_line",
            "image_uris.png",
        ]

        const search = getCallback(({ snapshot, set, reset }) => async (toast) => {
            const cardName = snapshot.getLoadable(searchCardNameState).contents
            const search = await snapshot.getPromise(findCard(cardName))
            if (search.status === "success") {
                const cardAlreadyOnList = await snapshot.getLoadable(cardStripsNamesState).contents.includes(cardName)
                console.log("cardOnList " + cardAlreadyOnList)
                if (!cardAlreadyOnList) {
                    // save the card to the list
                    set(cardStripsNamesState, val => [cardName, ...val])
                    set(cardStripInfoProperty({ cardName, path: "rytir_url" }), search.rytir_url)
                    set(cardStripInfoProperty({ cardName, path: "edhrec_url" }), search.edhrec_url)
                    set(cardStripInfoProperty({ cardName, path: "scryfall_url" }), search.scryfall.scryfall_uri)
                    if (has(search.scryfall, "card_faces")) {
                        const faces = getFaceObject(search.scryfall.card_faces, faceKeys)
                        set(cardStripInfoProperty({ cardName, path: "card_faces" }), faces)
                    } else {
                        const faces = [{
                            mana_cost: search.scryfall.mana_cost,
                            type_line: search.scryfall.type_line
                        }]
                        set(cardStripInfoProperty({ cardName, path: "card_faces" }), faces)
                    }
                    // set(cardStripInfoProperty({ cardName, path: "type_line" }), search.scryfall.type_line)
                }

                // get search params:
                const totalBuyAmount = snapshot.getLoadable(searchProperty("buyAmount")).contents
                const orderBy = snapshot.getLoadable(searchProperty("orderBy")).contents

                const results = search.cards
                // save the count of prints for card
                const ids = orderBy === "Price - Asc." ? range(results.length).reverse() : range(results.length)
                set(cardStripPrintIdsState(cardName), ids)
                // fill in the prints
                let buysRemaining = totalBuyAmount
                let addedCardStripPrice = 0
                ids.forEach((printId) => {
                    const prevBuyAmount = snapshot.getLoadable(cardPrintsState({ cardName, printId })).contents.buyAmount ?? 0
                    const buyAmount = min([results[printId].stock - prevBuyAmount, buysRemaining])
                    addedCardStripPrice += buyAmount * results[printId].price
                    buysRemaining = buysRemaining - buyAmount
                    set(cardPrintsState({ cardName, printId }),
                        {
                            ...results[printId],
                            buyAmount: buyAmount + prevBuyAmount,
                        }
                    )
                })
                // set the price of selected cards
                const prevCardStripPrice = snapshot.getLoadable(cardStripInfoProperty({ cardName, path: "price" })).contents ?? 0
                set(cardStripInfoProperty({ cardName, path: "price" }), prevCardStripPrice + addedCardStripPrice)

                // create description:
                let toastDescription
                let toastStatus
                if (totalBuyAmount > 0) { // did he want to buy
                    toastDescription = `${totalBuyAmount - buysRemaining}/${totalBuyAmount} added for ${addedCardStripPrice} Kč`
                    switch (totalBuyAmount - buysRemaining) {
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

            set(inputCardNameState, "")
            set(autoCompListSelectionState, -1)
        })

        return search
    }
})

const SearchBar = () => {

    const [inputCardName, setInputCardName] = useRecoilState(inputCardNameState)
    const setAutoCompListSelection = useSetRecoilState(autoCompListSelectionState)
    const searchForCard = useRecoilValue(searchCardState)
    const autocompleteList = getAutoCompList(inputCardName)
    const autocompleteListLen = autocompleteList.length

    const toast = useToast()

    const searchTextChangeHandler = ({ target: { value } }) => {
        setInputCardName(value)
    }

    const enterHandler = event => {
        event.preventDefault()
        if (inputCardName === "") return
        searchForCard(toast)
    }

    const downHandler = event => {
        event.preventDefault()
        setAutoCompListSelection((curval) => min([curval + 1, autocompleteListLen - 1]))
    }

    const upHandler = event => {
        event.preventDefault()
        setAutoCompListSelection((curval) => max([curval - 1, -1]))
    }

    const handleKeyDown = async (event) => {
        const keyCallback = {
            "Enter": enterHandler,
            "ArrowUp": upHandler,
            "ArrowDown": downHandler,
        }[event.key]
        keyCallback?.(event)
    }

    return (
        <VStack width={"full"} style={{ display: "inline-block" }}>
            <Flex width={"full"} pr={[2, 5]} pl={2}>
                <InputGroup variant={"filled"} size={"lg"} colorScheme={"teal"}>
                    <InputLeftElement
                        pointerEvents="none"
                    >
                        <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                        name={"Card search"}
                        type="search"
                        value={inputCardName}
                        placeholder="Search for a card"
                        _focus={{
                            background: "gray.200"
                        }}
                        // onChange={({target: {value}}) => setInputCardName(value)}
                        onChange={searchTextChangeHandler}
                        onKeyDown={handleKeyDown}
                        required={true}
                        autoFocus
                    />
                </InputGroup>
            </Flex>
            <Flex width={"full"} pr={[2, 5]} pl={2}>
                <AutocompleteFuzzySort autocompleteList={autocompleteList} />
            </Flex>
        </VStack>
    )
}

export default SearchBar