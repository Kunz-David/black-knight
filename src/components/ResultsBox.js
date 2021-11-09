import React from 'react';
import {Box, Center} from "@chakra-ui/react";

const ResultsBox = ({children}) => {
    return (
        <Center>
            <Box width={"full"} maxWidth={"7xl"}>
                {children}
            </Box>
        </Center>
    )
}

export default ResultsBox;