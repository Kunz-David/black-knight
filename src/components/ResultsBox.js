import { Box, Center } from "@chakra-ui/react"
import PropTypes from "prop-types"

const ResultsBox = ({ children }) => {
    return (
        <Center>
            <Box width={"full"} maxWidth={"7xl"}>
                {children}
            </Box>
        </Center>
    )
}

ResultsBox.propTypes = {
    children: PropTypes.node.isRequired
}

export default ResultsBox