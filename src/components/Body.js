import React from 'react';
import {Box, Center, Flex} from "@chakra-ui/react";
import DebugButton from "./DebugButton";

function Body({children}) {
    return (
        <div
            onMouseMove={console.log("mouse moved")}>
            <Center>
                <Box width={"full"} maxWidth={"7xl"} padding={[3, 7]}>
                    {children}
                </Box>
            </Center>
            <Flex position={"sticky"} bottom={1} right={1} padding={3} zIndex={1300}>
                <DebugButton/>
            </Flex>
        </div>
    )
}

export default Body;