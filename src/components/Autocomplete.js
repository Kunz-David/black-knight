import {selector, selectorFamily, useRecoilValue} from "recoil";
import {Flex, List, ListItem} from "@chakra-ui/react";
import {inputCardNameState} from "./header/SearchBar";

const fetchAutocompleteList = async (input) => {
    const url = `https://api.scryfall.com/cards/autocomplete?q=${input}`
    console.log("Searching for " + input + " in autocomplete")
    return await fetch(url).then((res) => res.json())
}

const autocompleteListGetter = selectorFamily({
    key: "autocompleteListGetter",
    get: (input) => async ({get}) => {
        const res = await fetchAutocompleteList(input)
        // console.log("res", res)
        return res
    },
})

const autocompleteListState = selector({
    key: "autocompleteList",
    get: ({get}) => get(autocompleteListGetter(get(inputCardNameState)))
})

export const autocompleteBestMatchState = selector({
    key: "autocompleteBestMatch",
    get: ({get}) => get(autocompleteListState)[0] ?? "no match found"
})

const Autocomplete = () => {
    const autocompleteList = useRecoilValue(autocompleteListState)
    // console.log("autocompleteList", autocompleteList)

    return <Flex width={"full"} pl={12} border={0} bgColor={"gray.300"}>
        <List spacing={"2"} variant={"outline"} width={"full"}>
            {autocompleteList.data.slice(0, 5).map(
                (item) =>
                    <ListItem key={item} color={"yellow"} width={"full"}>
                        {item}
                    </ListItem>
            )}
        </List>
    </Flex>
}

export default Autocomplete;