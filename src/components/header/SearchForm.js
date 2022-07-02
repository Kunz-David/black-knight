import { Flex } from "@chakra-ui/react"
import SearchOptionsModal from "./SearchOptionsModal"
import SearchBar from "./SearchBar"

function SearchForm() {

    return (
        <div>
            <Flex mb={[1, 2, 4]}>
                <SearchBar />
                <SearchOptionsModal />
            </Flex>
        </div>
    )
}

export default SearchForm