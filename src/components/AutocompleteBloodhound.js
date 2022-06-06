import {selector, selectorFamily, useRecoilValue} from "recoil";
import {Flex, List, ListItem} from "@chakra-ui/react";
import {inputCardNameState} from "./header/SearchBar";
import BloodhoundSearch from 'fz-search';
import {allCardsState, searcherState, searcherStateBloodhound} from "../atoms";
import Bloodhound from "bloodhound-js";

export const AUTOCOMPLETE_LEN = 5

const autocompleteListGetterBloodhoundState = selectorFamily({
    key: "autocompleteListGetterBloodhound",
    get: ({query}) => async () => {
        // const searcher = await get(searcherStateBloodhound)
        const engine = new Bloodhound({
            local: ['dog', 'pig', 'moose'],
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: Bloodhound.tokenizers.whitespace
        })
        var promise = await engine.initialize()
        console.log("searcher", promise)

        const res = engine.search(
            query,
            (a) => console.log("first fun", a),
            (a) => console.log("second fun", a),
        )
        // const res = []
        // const res = searcher.search(query)
        console.log("res", res)
        return res
    }
})

// autocomplete list, auto updated
export const autocompleteListBloodhoundState = selector({
    key: "autocompleteListBloodhound",
    get: async ({get}) => await get(autocompleteListGetterBloodhoundState({query: get(inputCardNameState)}))
})


const AutocompleteBloodhound = () => {
    const autocompleteList = useRecoilValue(autocompleteListBloodhoundState)

    console.log(Object.keys(autocompleteList).map(key => autocompleteList[key]))

    return <Flex width={"full"} pl={12} border={0} bgColor={"gray.300"}>
        <div>
            {/*{Object.keys(autocompleteList).map(key => <div key={key}>{autocompleteList[key]}</div>)}*/}
            {/*<List spacing={"2"} variant={"outline"} width={"full"}>*/}
            {/*    {autocompleteList.slice(0, autocompleteList.length).map(*/}
            {/*        (item, index) => {*/}
            {/*            return <ListItem key={item}*/}
            {/*                             width={"full"}*/}
            {/*                // style={index === false ? selectedStyle : defaultStyle}*/}
            {/*            >*/}
            {/*                {item}*/}
            {/*            </ListItem>*/}
            {/*        }*/}
            {/*    )}*/}
            {/*</List>*/}
        </div>
    </Flex>
}

export default AutocompleteBloodhound;