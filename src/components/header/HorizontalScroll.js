import {HStack} from "@chakra-ui/react";

const HorizontalScroll = ({children}) => (
    <HStack
        spacing={2}
        position="sticky"
        top="0"
        bgColor="primary.100"
        zIndex="sticky"
        // height="60px"
        alignItems="left"
        flexWrap="nowrap"
        overflowX="auto"
        px="2"
        css={{
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "-ms-autohiding-scrollbar"
        }}
    >
        {children}
    </HStack>)

export default HorizontalScroll