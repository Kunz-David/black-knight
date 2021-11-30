import {Suspense} from 'react';
import {Flex, Input, InputGroup, InputLeftElement, List, ListItem} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {
    atom, selector,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from "recoil";
import {searchCardNameState} from "./SearchForm";

const inputCardNameState = atom({
    key: "inputCardName",
    default: "",
    effects_UNSTABLE: []
})

const fetchAutocompleteList = async (input) => {
    const url = `https://api.scryfall.com/cards/autocomplete?q=${input}`
    console.log("Searching for " + input + " in autocomplete")
    return await fetch(url).then((res) => res.json())
}

const autocompleteListGetter = selectorFamily({
    key: "autocompleteListGetter",
    get: (input) => async ({get}) => {
        const res = await fetchAutocompleteList(input)
        console.log("res", res)
        return res
    },
})

const autocompleteListState = selector({
    key: "autocompleteList",
    get: ({get}) => get(autocompleteListGetter(get(inputCardNameState)))
})

const Autocomplete = () => {
    const autocompleteList = useRecoilValue(autocompleteListState)
    console.log("autocompleteList", autocompleteList)

    return <div>
        <List>
            {autocompleteList.data.map(
                (item) =>
                    <ListItem key={item}>
                        {item}
                    </ListItem>
            )}
        </List>
    </div>
}


const SearchBar = () => {

    // card name
    const [inputCardName, setInputCardName] = useRecoilState(inputCardNameState)
    const setSearchCardName = useSetRecoilState(searchCardNameState)


    const searchTextChangeHandler = ({target: {value}}) => {
        setInputCardName(value)
    }

    const addCard = event => {
        console.debug("in add card input: " + inputCardName)
        event.preventDefault()
        if (inputCardName === "") return
        setSearchCardName(inputCardName)
        setInputCardName("")
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addCard(event)
        }
    }

    return (
        <Flex width={"full"}>
            <InputGroup variant={"filled"} size={"lg"} colorScheme={"teal"} mr={[2, 5]} ml={2}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
                <Input
                    name={"Card search"}
                    type="search"
                    value={inputCardName}
                    placeholder="Search for a card"
                    // onChange={({target: {value}}) => setInputCardName(value)}
                    onChange={searchTextChangeHandler}
                    onKeyDown={handleKeyDown}
                    required={true}
                />
            </InputGroup>
            <Suspense fallback={<div>Loading :)</div>}>
                <Autocomplete />
            </Suspense>
        </Flex>

    )
}

export default SearchBar;