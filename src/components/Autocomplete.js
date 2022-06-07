import {
    atom,
    selector,
    selectorFamily,
    useRecoilValue,
} from "recoil";
import {Flex, List, ListItem} from "@chakra-ui/react";
import {inputCardNameState} from "./header/SearchBar";

export const AUTOCOMPLETE_LEN = 5

// selection from the autocomplete list
const autocompleteListSelectionState = atom({
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
    get: ({get}) => get(autocompleteListGetter(get(inputCardNameState))).data
})

const Autocomplete = () => {
    const autocompleteList = useRecoilValue(autocompleteListState)
    const autocompleteListSelection = useRecoilValue(autocompleteListSelectionState)
    // const autocompleteBestMatch = useRecoilValue(autocompleteBestMatchState)
    // const [updateInputCardName, setUpdateInputCardName] = useRecoilState(updateInputCardNameState)
    // console.log("autocompleteList", autocompleteList)

    const selectedStyle = {
        color: "orange",
        fontWeight: "bold"
    }

    const defaultStyle = {
    }

    return <Flex width={"full"} pl={12} border={0} bgColor={"gray.300"}>
        <List spacing={"2"} variant={"outline"} width={"full"}>
            {autocompleteList.slice(0, AUTOCOMPLETE_LEN).map(
                (item, index) => {
                    return <ListItem
                                key={item}
                                width={"full"}
                                style={index === autocompleteListSelection ? selectedStyle : defaultStyle}
                    >
                        {item}
                    </ListItem>
                }
            )}
        </List>
    </Flex>
}

export default Autocomplete;