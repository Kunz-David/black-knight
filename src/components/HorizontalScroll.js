import {Flex} from "@chakra-ui/react";

const HorizontalScroll = ({contents}) => (
    <Flex
        position="sticky"
        top="0"
        bgColor="primary.100"
        zIndex="sticky"
        flex-gap="sx"
        // height="60px"
        alignItems="center"
        flexWrap="nowrap"
        overflowX="auto"
        px="2"
        css={{
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "-ms-autohiding-scrollbar"
        }}
    >
        {contents()}
    </Flex>)

export default HorizontalScroll