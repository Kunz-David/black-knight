import { Flex, List, Box } from "@chakra-ui/react";
import { atom, errorSelector, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { autoCompArrowsListSelectionState, inputCardNameState } from "./header/SearchBar";
import fuzzysort from 'fuzzysort'
import { useEffect } from "react";
import cardsNames from "../data/card-names.json"

const list = cardsNames.data

const AUTOCOMP_MAX_LEN = 5

const options = {
    limit: AUTOCOMP_MAX_LEN,
    threshold: -10000
}

export const getAutoCompList = (inputCardName) => fuzzysort.go(inputCardName, list, options)

export const autocompleteListState = atom({
    key: "autocompleteListState",
    default: errorSelector('Attempt to use Atom before initialization')
})

export const autcompleteListLengthState = atom({
    key: "autocompleteListLengthState",
    default: AUTOCOMP_MAX_LEN
})

function Highlighted({result}) {

    const style = {
        // color: "red",
    }

    return (
        <span white-space="nowrap">
            {fuzzysort.highlight(result, (match, i) => <b style={style} key={`${match}_${i}`}>{match}</b>)}
        </span>
    )
}

// selection from the autocomplete list
export const autoCompListSelectionState = selector({
    key: "autoCompListSelectionState",
    get: ({ get }) => {
        const hoverIndex = get(autoCompHoverListSelectionState)
        const arrowsIndex = get(autoCompArrowsListSelectionState)

        if (hoverIndex !== -1) {
            return hoverIndex
        }  
        return arrowsIndex
    }
})

const autoCompHoverListSelectionState = atom({
    key: "autoCompHoverListSelectionState",
    default: -1
})


function AutocompleteListItem({item, index, inputCardName}) {

    const autoCompListSelection = useRecoilValue(autoCompListSelectionState)
    const setAutoCompHoverListSelection = useSetRecoilState(autoCompHoverListSelectionState)
    
    const selectedStyle = {
        color: "orange",
        fontWeight: "semibold",
        border: 'none',
        borderRadius: '2pt',
        boxShadow: '0 0 0 1pt grey',
        outline: 'none',
        transition: '.15s'
    }

    const defaultStyle = {
    }


    return (
        <Box
            onMouseOver={() => setAutoCompHoverListSelection(index)}
            onMouseOut={() => setAutoCompHoverListSelection(-1)}
            width={"full"}
            style={index === autoCompListSelection ? selectedStyle : defaultStyle}
            white-space={"nowrap"}
            // _hover={selectedStyle}
        >
            <Highlighted result={item} />
        </Box>
    )
}


function AutocompleteFuzzySort() {

    // const listLen = useRecoilValue(autcompleteListLengthState)
    const setListLen = useSetRecoilState(autcompleteListLengthState)
    const listLen = AUTOCOMP_MAX_LEN
    const inputCardName = useRecoilValue(inputCardNameState)
    
    const autocompleteList = getAutoCompList(inputCardName)

    useEffect(() => setListLen(autocompleteList.length), [autocompleteList, setListLen])
    // useEffect(() => setAutocompleteList(autocompleteList), [autocompleteList])
    // console.log("simple fuzzzy", autocompleteList.slice(0, listLen))

    return (
        <Flex width={"full"} pl={12} border={0} bgColor={"gray.300"}>
            <List
                spacing={"2"}
                variant={"outline"}
                width={"full"}
            >
                {autocompleteList.slice(0, listLen).map(
                    (item, index) => {
                        console.log(`${item.target}_${item._indexes.length}`)
                        return (
                            <AutocompleteListItem item={item} index={index} inputCardName={inputCardName} key={`${item.target}_${item._indexes.length}`}/>
                        )
                    }
                )}
            </List>
        </Flex>
    )
}

export default AutocompleteFuzzySort;