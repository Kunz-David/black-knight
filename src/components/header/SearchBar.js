import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import { max, min } from "lodash";
import { Suspense } from 'react';
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import AutocompleteFuzzySort, { getAutoCompList } from '../AutocompleteFuzzySort';

export const inputCardNameState = atom({
    key: "inputCardName",
    default: "",
    effects_UNSTABLE: []
})

export const searchForCardState = atom({
    key: "updateInputCardName",
    default: false,
})

// selection from the autocomplete list
export const autoCompListSelectionState = atom({
    key: "autoCompListSelectionState",
    default: -1,
})


const SearchBar = () => {

    const [inputCardName, setInputCardName] = useRecoilState(inputCardNameState)
    const setAutoCompListSelection = useSetRecoilState(autoCompListSelectionState)
    const setSearchForCard = useSetRecoilState(searchForCardState)
    
    const autocompleteList = getAutoCompList(inputCardName)
    const autocompleteListLen = autocompleteList.length


    const searchTextChangeHandler = ({ target: { value } }) => {
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
        <VStack width={"full"} style={{display: "inline-block"}}>
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
                <Suspense fallback={<div>Loading :)</div>}>
                    <AutocompleteFuzzySort autocompleteList={autocompleteList}/>
                </Suspense>
            </Flex>
        </VStack>
    )
}

export default SearchBar;