import './App.css';
import Header from "./components/Header";
import {MtgCardViewer} from 'mtg-card-viewer';
import SearchForm from "./components/SearchForm";
import CardStripsContainer from "./components/CardStripsContainer";
import CardStripsOperationsMenu from "./components/CardStripsOperationsMenu";
import ResultsBox from "./components/ResultsBox";
import Body from "./components/Body";
import {Divider} from "@chakra-ui/react";


function App() {
    return (
        <div className="App">
            <Header/>
            <Body>
                <p>Of all MTG cards, <MtgCardViewer searchTerm='lightning bolt'/> is my favorite!</p>
                <SearchForm/>
                <ResultsBox>
                    <CardStripsOperationsMenu/>
                    <Divider py={3}/>
                    <CardStripsContainer/>
                </ResultsBox>
            </Body>
        </div>
    )
}

export default App;
