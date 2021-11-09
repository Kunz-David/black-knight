import React from 'react';
import {Box, Center} from "@chakra-ui/react";

const Body = ({children}) => {
    return (
        <Center>
            <Box width={"full"} maxWidth={"7xl"} padding={[3, 7]}>
                {children}
            </Box>
        </Center>
    )
}

export default Body;