import { Box, Center } from "@chakra-ui/react"
import PropTypes from "prop-types"

Header.propTypes = {
    children: PropTypes.node.isRequired
}

function Header({ children }) {
    return (
        <Box className="header"
            paddingY={[2, 3, 4]}
            bgColor={"gray"}
        >
            <Center>
                <Box width={"full"}
                    paddingX={[3, 7]}
                    maxWidth={"7xl"}>
                    {children}
                </Box>
            </Center>
        </Box>
    )
}

export default Header