import React from 'react';
import {Box, Heading, HStack, IconButton, Spacer, Text} from "@chakra-ui/react";
import {useSetRecoilState, useRecoilValue} from "recoil";
import {DeleteIcon} from "@chakra-ui/icons";
import {
    cardStripInfoProperty, cardStripInfoState,
} from "../atoms";
import {useDestroyStrip} from "../utils/destroyStrip";
import {ReactComponent as CernyRytirLogo} from '../assets/cerny_rytir_ver1.svg';
import {ReactComponent as CernyRytirLogoTwo} from '../assets/cerny_rytir_ver2.svg';
import {ReactComponent as EDHRECLogo} from '../assets/edhrec.svg';



function CardStripOptions({cardName}) {

    const setCardStripVisible = useSetRecoilState(cardStripInfoProperty({cardName, path: "visible"}))
    const cardStripPrice = useRecoilValue(cardStripInfoProperty({cardName, path: "price"}))
    const cardStripInfo = useRecoilValue(cardStripInfoState(cardName))
    // const cardStripPrice = useRecoilValue(cardStripPriceState(cardName))

    const destroyStrip = useDestroyStrip()



    const handleToggle = () => setCardStripVisible(val => !val)

    return (
        <HStack width={"full"}
                border={"2px solid"}
                borderColor={"gray.300"}
                rounded={"md"}
                onClick={handleToggle}
                _hover={{ bg: "gray.200" }}
                _focus={{ boxShadow: "inner" }}>
            <HStack>
                <Box p="2">
                    <Heading size="md">{cardName}</Heading>
                </Box>
                <IconButton
                    variant='ghost'
                    colorScheme='black'
                    aria-label='Černý Rytíř'
                    size='xs'
                    icon={<CernyRytirLogo width={20} height={20}/>}
                />
                <IconButton
                    variant='ghost'
                    colorScheme='black'
                    aria-label='Černý Rytíř'
                    size='xs'
                    icon={<CernyRytirLogoTwo width={20} height={20}/>}
                />
                <IconButton
                    variant='ghost'
                    colorScheme='black'
                    aria-label='EDHREC'
                    size='xs'
                    icon={<EDHRECLogo width={20} height={20}/>}
                />
            </HStack>
            <Spacer/>
            <Box>
                <Text fontWeight={"semibold"}>
                    Cost: {cardStripPrice} Kč
                </Text>
            </Box>
            <IconButton
                icon={<DeleteIcon />}
                aria-label={"Remove card."}
                mr="2" colorScheme="red"
                variant={"ghost"}
                onClick={(event) => {
                    event.stopPropagation()
                    destroyStrip(cardName)
                    console.log("cardStripPrice after destroy", cardStripPrice)
                    console.log("cardStripInfo after destroy", cardStripInfo)
                }} />
        </HStack>
    )
}

export default CardStripOptions;