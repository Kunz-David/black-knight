import {selector, selectorFamily, useRecoilValue} from "recoil";
import {Flex, List, ListItem} from "@chakra-ui/react";
import {inputCardNameState} from "./header/SearchBar";
import BloodhoundSearch from 'fz-search';
import {allCardsState, searcherState, searcherStateBloodhound} from "../atoms";

export const AUTOCOMPLETE_LEN = 5

const autocompleteListGetterBloodhoundState = selectorFamily({
    key: "autocompleteListGetterBloodhound",
    get: ({query}) => async ({get}) => {
        const searcher = await get(searcherState)
        console.log("searcher", searcher)

        const res = searcher.search(query)
        // const res = []
        // const res = searcher.search(query)
        console.log("res", res)
        return res
    }
})

// // async wrapper selector waiting for autocomplete list
// const autocompleteListGetterBloodhound = selectorFamily({
//     key: "autocompleteListGetter",
//     get: ({searcher, query}) => () => {
//         return searcher.search(query)
//     },
// })
//
// autocomplete list, auto updated
export const autocompleteListBloodhoundState = selector({
    key: "autocompleteListBloodhound",
    get: async ({get}) => await get(autocompleteListGetterBloodhoundState({query: get(inputCardNameState)}))
})

const AutocompleteBloodhound = () => {
    const autocompleteList = useRecoilValue(autocompleteListBloodhoundState)
    // const query = useRecoilValue(inputCardNameState)
    // // const autocompleteBestMatch = useRecoilValue(autocompleteBestMatchState)
    // // const [updateInputCardName, setUpdateInputCardName] = useRecoilState(updateInputCardNameState)
    // // console.log("autocompleteList", autocompleteList)
    // // const data = useRecoilValue(allCardsState)
    // var data = ["survey","surgery","insurgence", "ahoj", "jak", "se mas", "semas"];
    // var searcher = new BloodhoundSearch({source:data});
    // // var query = "sema";
    // var result = searcher.search(query)
    // console.log("Bloodhound", result)

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

export default AutocompleteBloodhound;