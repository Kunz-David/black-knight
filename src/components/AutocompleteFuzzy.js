import {selector, selectorFamily, useRecoilValue} from "recoil";
import {Flex, List, ListItem} from "@chakra-ui/react";
import {inputCardNameState} from "./header/SearchBar";
import fuzzySearch from 'fz-search';
import {allCardsState, searcherState} from "../atoms";

export const AUTOCOMPLETE_LEN = 5

const autocompleteListGetterFuzzyState = selectorFamily({
    key: "autocompleteListGetterFuzzy",
    get: ({query}) => async ({get}) => {
        // const searcher = new fuzzySearch({source: []})
        // TODO: for some reason fails, when you get the searcher from an atom
        var searcher = await get(searcherState)
        console.log("searcher before", searcher)
        searcher = {...searcher}
        console.log("searcher after", searcher)
        // const data = await get(allCardsState).data
        // const res = (new fuzzySearch({source: data, output_limit: 6})).search(query) // this works but creates a new object on every keystroke...
        const res = searcher.search(query)
        console.log("res", res)
        return res
    }
})

// // async wrapper selector waiting for autocomplete list
// const autocompleteListGetterFuzzy = selectorFamily({
//     key: "autocompleteListGetter",
//     get: ({searcher, query}) => () => {
//         return searcher.search(query)
//     },
// })
//
// autocomplete list, auto updated
export const autocompleteListFuzzyState = selector({
    key: "autocompleteListFuzzy",
    get: async ({get}) => await get(autocompleteListGetterFuzzyState({query: get(inputCardNameState)}))
})

const AutocompleteFuzzy = () => {
    const autocompleteList = useRecoilValue(autocompleteListFuzzyState)
    // const query = useRecoilValue(inputCardNameState)
    // // const autocompleteBestMatch = useRecoilValue(autocompleteBestMatchState)
    // // const [updateInputCardName, setUpdateInputCardName] = useRecoilState(updateInputCardNameState)
    // // console.log("autocompleteList", autocompleteList)
    // // const data = useRecoilValue(allCardsState)
    // var data = ["survey","surgery","insurgence", "ahoj", "jak", "se mas", "semas"];
    // var searcher = new fuzzySearch({source:data});
    // // var query = "sema";
    // var result = searcher.search(query)
    // console.log("fuzzy", result)

    // const selectedStyle = {
    //     color: "orange",
    //     fontWeight: "bold"
    // }
    //
    // const defaultStyle = {
    // }

    return <Flex width={"full"} pl={12} border={0} bgColor={"gray.300"}>
        <div>
            <List spacing={"2"} variant={"outline"} width={"full"}>
                {autocompleteList.slice(0, autocompleteList.length).map(
                    (item, index) => {
                        return <ListItem key={item}
                                         width={"full"}
                                         // style={index === false ? selectedStyle : defaultStyle}
                        >
                            {item}
                        </ListItem>
                    }
                )}
            </List>
        </div>
    </Flex>
}

export default AutocompleteFuzzy;