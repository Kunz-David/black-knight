import './App.css';
import SearchForm from "./components/header/SearchForm";
import CardStripsContainer from "./components/CardStripsContainer";
import CardStripsOperationsMenu from "./components/CardStripsOperationsMenu";
import ResultsBox from "./components/ResultsBox";
import Body from "./components/Body";
import {Divider} from "@chakra-ui/react";
import Header from "./components/header/Header";
import {allCardsState, searcherState, searcherStateBloodhound} from "./atoms";
import {useRecoilCallback, useRecoilValue} from "recoil";
import fuzzySearch from 'fz-search';
import {useEffect} from "react";
import Bloodhound from "bloodhound-js"


function App() {

    // Fuzzy
    const allCardnames = useRecoilValue(allCardsState)
    const setupSearcher = useRecoilCallback(({set}) => async () => {
        console.log("allCardnames", allCardnames)
        var engine = new fuzzySearch({source: allCardnames.data, output_limit: 6})
        set(searcherState, engine)
        // set(searcherState, new fuzzySearch({source: []}))
    })
    useEffect(() => setupSearcher())

    // // Bloodhound
    // const setupSearcherBloodhound = useRecoilCallback(({set}) => async () => {
    //     const engine = new Bloodhound({
    //         local: ['dog', 'pig', 'moose'],
    //         queryTokenizer: Bloodhound.tokenizers.whitespace,
    //         datumTokenizer: Bloodhound.tokenizers.whitespace
    //     })
    //
    //     const engine.initialize()
    //
    //     set(searcherStateBloodhound, engine)
    // })
    //
    // useEffect(() => setupSearcherBloodhound())

    return (
        <div className="App">
            <Header>
                <SearchForm/>
            </Header>
            <Body>
                <ResultsBox>
                    <CardStripsOperationsMenu/>
                    <Divider mt={2} mb={[2,3]}/>
                    <CardStripsContainer/>
                </ResultsBox>
            </Body>
        </div>
    )
}

export default App;
