import {atom, selector, selectorFamily, useRecoilState, useRecoilValue} from "recoil";
import {Flex, List, ListItem} from "@chakra-ui/react";
import {inputCardNameState} from "./header/SearchBar";

export const AUTOCOMPLETE_LEN = 5


// selection from the autocomplete list
export const autocompleteListSelectionState = atom({
    key: "autocompleteListSelector",
    default: -1,
})

// get the autocomplete from scryfall from cardname
const fetchAutocompleteList = async (input) => {
    const url = `https://api.scryfall.com/cards/autocomplete?q=${input}`
    console.log("Searching for " + input + " in autocomplete")
    return await fetch(url).then((res) => res.json())
}

// async wrapper selector waiting for autocomplete list
const autocompleteListGetter = selectorFamily({
    key: "autocompleteListGetter",
    get: (input) => async ({get}) => {
        const res = await fetchAutocompleteList(input)
        console.log("res", res)
        return res
    },
})

// autocomplete list, auto updated
export const autocompleteListState = selector({
    key: "autocompleteList",
    get: ({get}) => get(autocompleteListGetter(get(inputCardNameState)))
})

// top match from the autocomplete list
export const autocompleteBestMatchState = selector({
    key: "autocompleteBestMatch",
    get: ({get}) => get(autocompleteListState)[0] ?? "no match found"
})

const Autocomplete = () => {
    const autocompleteList = useRecoilValue(autocompleteListState)
    const [autocompleteListSelection, setAutocompleteListSelection] = useRecoilState(autocompleteListSelectionState)
    const autocompleteBestMatch = useRecoilValue(autocompleteBestMatchState)
    // console.log("autocompleteList", autocompleteList)

    const selectedStyle = {
        color: "orange",
        fontWeight: "bold"
    }

    const defaultStyle = {
    }

    return <Flex width={"full"} pl={12} border={0} bgColor={"gray.300"}>
        <List spacing={"2"} variant={"outline"} width={"full"}>
            {autocompleteList.data.slice(0, AUTOCOMPLETE_LEN).map(
                (item, index) =>
                    <ListItem key={item}
                              width={"full"}
                              style={index === autocompleteListSelection ? selectedStyle : defaultStyle}
                    >
                        {item}
                    </ListItem>
            )}
        </List>
    </Flex>
}

export default Autocomplete;