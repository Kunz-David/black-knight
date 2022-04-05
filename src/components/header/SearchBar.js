import {Suspense} from 'react';
import {Flex, Input, InputGroup, InputLeftElement, VStack} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {
    atom, useRecoilState,
    useSetRecoilState, useRecoilValue,
} from "recoil";
import {searchCardNameState} from "./SearchForm";
import Autocomplete, {autocompleteBestMatchState} from "../Autocomplete";

export const inputCardNameState = atom({
    key: "inputCardName",
    default: "",
    effects_UNSTABLE: []
})


const SearchBar = () => {

    // card name
    const [inputCardName, setInputCardName] = useRecoilState(inputCardNameState)
    const setSearchCardName = useSetRecoilState(searchCardNameState)
    // const autocompleteBestMatch = useRecoilValue(autocompleteBestMatchState)


    const searchTextChangeHandler = ({target: {value}}) => {
        setInputCardName(value)
    }

    const addCard = event => {
        console.debug("in add card input: " + inputCardName)
        event.preventDefault()
        if (inputCardName === "") return
        setSearchCardName(inputCardName)
        // setSearchCardName(autocompleteBestMatch)
        setInputCardName("")
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addCard(event)
        }
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