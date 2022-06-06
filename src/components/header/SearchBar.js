import {Suspense} from 'react';
import {Flex, Input, InputGroup, InputLeftElement, VStack} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {
    atom, useRecoilState,
    useSetRecoilState,
} from "recoil";
import {
    AUTOCOMPLETE_LEN,
    autocompleteListSelectionState,
} from "../Autocomplete";
import {max, min} from "lodash";
import AutocompleteFuzzySort from '../AutocompleteFuzzySort';
import ErrorBoundary from '../ErrorBoundary';

export const inputCardNameState = atom({
    key: "inputCardName",
    default: "",
    effects_UNSTABLE: []
})

export const searchForCardState = atom({
    key: "updateInputCardName",
    default: false,
})


const SearchBar = () => {

    const [inputCardName, setInputCardName] = useRecoilState(inputCardNameState)
    const setAutocompleteListSelection = useSetRecoilState(autocompleteListSelectionState)
    const setSearchForCard = useSetRecoilState(searchForCardState)


    const searchTextChangeHandler = ({target: {value}}) => {
        setInputCardName(value)
    }

    const enterHandler = event => {
        event.preventDefault()
        console.debug("in add card input: " + inputCardName)
        if (inputCardName === "") return
        setSearchForCard(true)
    }

    const downHandler = event => {
        event.preventDefault()
        // TODO: limit to the actual number of autocompletes not AUTOCOMPLETE_LEN -> (problem because autocompleteListState is async)
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
                    <VStack>
                        <AutocompleteFuzzySort />
                    </VStack>
                </Suspense>
            </Flex>
        </VStack>
    )
}

export default SearchBar;