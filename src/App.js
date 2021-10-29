import './App.css';
import Header from "./components/Header";
import {MtgCardViewer} from 'mtg-card-viewer';
import SearchForm from "./components/SearchForm";
import CardsContainer from "./components/CardsContainer";


function App() {
    return (
        <div className="App">
            <Header/>
            <p>Of all MTG cards, <MtgCardViewer searchTerm='lightning bolt'/> is my favorite!</p>
            {/*<Mana symbol="2b" cost fixed size="2x"/>*/}
            <SearchForm/>
            <CardsContainer/>
        </div>
    )
}

export default App;
