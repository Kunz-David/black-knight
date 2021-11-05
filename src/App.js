import './App.css';
import Header from "./components/Header";
import {MtgCardViewer} from 'mtg-card-viewer';
import SearchForm from "./components/SearchForm";
import CardStripsContainer from "./components/CardStripsContainer";
import CardStripsOperationsMenu from "./components/CardStripsOperationsMenu";


function App() {
    return (
        <div className="App">
            <Header/>
            <p>Of all MTG cards, <MtgCardViewer searchTerm='lightning bolt'/> is my favorite!</p>
            {/*<Mana symbol="2b" cost fixed size="2x"/>*/}
            <SearchForm/>
            <CardStripsOperationsMenu/>
            <CardStripsContainer/>
        </div>
    )
}

export default App;
