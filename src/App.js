import './App.css'
import SearchForm from "./components/header/SearchForm"
import CardStripsContainer from "./components/CardStripsContainer"
import CardStripsOperationsMenu from "./components/CardStripsOperationsMenu"
import ResultsBox from "./components/ResultsBox"
import Body from "./components/Body"
import { Divider } from "@chakra-ui/react"
import Header from "./components/header/Header"


function App() {
    return (
        <div className="App">
            <Header>
                <SearchForm />
            </Header>
            <Body>
                <ResultsBox>
                    <CardStripsOperationsMenu />
                    <Divider mt={2} mb={[2, 3]} />
                    <CardStripsContainer />
                </ResultsBox>
            </Body>
        </div>
    )
}

export default App
