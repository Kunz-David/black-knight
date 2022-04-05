import {Suspense} from 'react';
import {Flex, Input, InputGroup, InputLeftElement, VStack} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {
    atom, useRecoilState,
    useSetRecoilState, useRecoilValue,
} from "recoil";
import {searchCardNameState} from "./SearchForm";
import Autocomplete, {
    AUTOCOMPLETE_LEN,
    autocompleteBestMatchState,
    autocompleteListSelectionState, autocompleteListState,
} from "../Autocomplete";
import {max, min} from "lodash";

export const inputCardNameState = atom({
    key: "inputCardName",
    default: "",
    effects_UNSTABLE: []
})

export const updateInputCardNameState = atom({
    key: "updateInputCardName",
    default: false,
})


const SearchBar = () => {

    // card name
    const [inputCardName, setInputCardName] = useRecoilState(inputCardNameState)
    const setSearchCardName = useSetRecoilState(searchCardNameState)
    const [autocompleteListSelection, setAutocompleteListSelection] = useRecoilState(autocompleteListSelectionState)
    const setUpdateInputCardName = useSetRecoilState(updateInputCardNameState)
    // const autocompleteList = useRecoilValue(autocompleteListState)
    // const autocompleteBestMatch = useRecoilValue(autocompleteBestMatchState)


    const searchTextChangeHandler = ({target: {value}}) => {
        setInputCardName(value)
    }

    const enterHandler = event => {
        event.preventDefault()
        if (autocompleteListSelection === -1) {
            addCard()
        } else {
            setUpdateInputCardName(true)
            // console.log(autocompleteList[autocompleteListSelection])
        }
    }

    const addCard = () => {
        console.debug("in add card input: " + inputCardName)
        if (inputCardName === "") return
        setSearchCardName(inputCardName)
        // setSearchCardName(autocompleteBestMatch)
        setInputCardName("")
    }

    const downHandler = event => {
        event.preventDefault()
        setAutocompleteListSelection((curval) => min([curval + 1, AUTOCOMPLETE_LEN-1]))
    }

    const upHandler = event => {
        event.preventDefault()
        setAutocompleteListSelection((curval) => max([curval - 1, -1]))
    }

    const handleKeyDown = async (event) => {
        const keyCallback = {
            "Enter"      : enterHandler,
            "ArrowUp"    : upHandler,
            "ArrowDown"  : downHandler,
        }[event.key]
        keyCallback?.(event)
    }

    return (
        <VStack width={"full"}>
            <Flex width={"full"} pr={[2, 5]} pl={2}>
                    <InputGroup variant={"filled"} size={"lg"} colorScheme={"teal"}>
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
            </Flex>
            <Flex width={"full"} pr={[2, 5]} pl={2}>
                <Suspense fallback={<div>Loading :)</div>}>
                    <Autocomplete />
                </Suspense>
            </Flex>
        </VStack>
    )
}

export default SearchBar;