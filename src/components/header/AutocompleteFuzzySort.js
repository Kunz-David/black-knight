import { Flex, List, Box } from "@chakra-ui/react"
import { atom, errorSelector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { autoCompListSelectionState, inputCardNameState, searchForCardState } from "./SearchBar"
import fuzzysort from 'fuzzysort'
import { useEffect } from "react"
import cardsNames from "../../data/card-names.json"
import PropTypes from "prop-types"

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

const fuzzysortItemType = PropTypes.shape({
    target: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
}).isRequired

Highlighted.propTypes = {
    result: fuzzysortItemType
}

function Highlighted({ result }) {

    const style = {
        // color: "red",
    }

    return (
        <span white-space="nowrap">
            {fuzzysort.highlight(result, (match, i) => <b style={style} key={`${match}_${i}`}>{match}</b>)}
        </span>
    )
}

AutocompleteListItem.propTypes = {
    item: fuzzysortItemType,
    index: PropTypes.number.isRequired
}

function AutocompleteListItem({ item, index }) {

    const [autoCompListSelection, setAutoCompListSelection] = useRecoilState(autoCompListSelectionState)
    const setSearchForCard = useSetRecoilState(searchForCardState)

    const selectedStyle = {
        color: "orange",
        fontWeight: "semibold",
        backgroundColor: "#E2E8F0", // "gray.200" not being recognized...
    }

    const defaultStyle = {
    }


    return (
        <Box
            onMouseOver={() => setAutoCompListSelection(index)}
            onMouseOut={() => setAutoCompListSelection(-1)}
            onClick={(event) => { setSearchForCard(true) }}
            width={"full"}
            white-space={"nowrap"}
            style={index === autoCompListSelection ? selectedStyle : defaultStyle}
        // _hover={selectedStyle}
        >
            <Highlighted result={item} />
        </Box>
    )
}


AutocompleteFuzzySort.propTypes = {
    autocompleteList: PropTypes.array.isRequired
}

function AutocompleteFuzzySort({ autocompleteList }) {

    const setListLen = useSetRecoilState(autcompleteListLengthState)
    const listLen = autocompleteList.length
    const inputCardName = useRecoilValue(inputCardNameState)

    useEffect(() => setListLen(autocompleteList.length), [autocompleteList, setListLen])

    return (
        <Flex width={"full"} pl={12} border={0} bgColor={"gray.300"}>
            <List
                spacing={"2"}
                variant={"outline"}
                width={"full"}
            >
                {autocompleteList.slice(0, listLen).map(
                    (item, index) => {
                        // console.log(`${item.target}_${item._indexes.length}`)
                        return (
                            <AutocompleteListItem item={item} index={index} inputCardName={inputCardName} key={`${item.target}_${item._indexes.length}`} />
                        )
                    }
                )}
            </List>
        </Flex>
    )
}

export default AutocompleteFuzzySort