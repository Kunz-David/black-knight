import React from 'react';
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {atom, useRecoilState, useSetRecoilState} from "recoil";
import {searchCardNameState} from "./SearchForm";

const inputCardNameState = atom({
    key: "inputCardName",
    default: "",
})

const SearchBar = () => {

    // card name
    const [inputCardName, setInputCardName] = useRecoilState(inputCardNameState)
    const setSearchCardName = useSetRecoilState(searchCardNameState)

    const addCard = event => {
        console.log("in add card input: " + inputCardName)
        event.preventDefault()
        if (inputCardName === "" ||
            inputCardName === null) {
            console.log("prevented")
            return
        }
        setSearchCardName(inputCardName)
        setInputCardName("")
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addCard(event)
        }
    }

    return (
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
                onChange={({target: {value}}) => setInputCardName(value)}
                onKeyDown={handleKeyDown}
                required={true}
            />
        </InputGroup>
    )
}

export default SearchBar;