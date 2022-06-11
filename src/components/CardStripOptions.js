import React from 'react';
import {Box, Heading, HStack, IconButton, Link, Spacer, Text} from "@chakra-ui/react";
import {useSetRecoilState, useRecoilValue} from "recoil";
import {DeleteIcon} from "@chakra-ui/icons";
import {
    cardStripInfoProperty, cardStripInfoState,
} from "../atoms";
import {useDestroyStrip} from "../utils/destroyStrip";
import {ReactComponent as CernyRytirLogo} from '../assets/cerny_rytir_ver1.svg';
import {ReactComponent as CernyRytirLogoTwo} from '../assets/cerny_rytir_ver2.svg';
import {ReactComponent as EDHRECLogo} from '../assets/edhrec.svg';

function ButtonLink( {href, ...ButtonLinkProps} ) {

    return (
        <a href={href} target="_blank" rel='noopener noreferrer'>
            <IconButton
                {...ButtonLinkProps}
                variant='ghost'
                colorScheme='black'
                size='xs'
            />
        </a>
    )
}


// FIXME: buttons are in collapse, so clicking them also colapses

function CardStripOptions({cardName}) {

    const setCardStripVisible = useSetRecoilState(cardStripInfoProperty({cardName, path: "visible"}))
    const cardStripPrice = useRecoilValue(cardStripInfoProperty({cardName, path: "price"}))
    const cardStripRytirUrl = useRecoilValue(cardStripInfoProperty({cardName, path: "rytirUrl"}))
    const cardStripEdhrecUrl = useRecoilValue(cardStripInfoProperty({cardName, path: "edhrecUrl"}))
    const cardStripScryfallUrl = useRecoilValue(cardStripInfoProperty({cardName, path: "scryfallUrl"}))
    // const cardStripInfo = useRecoilValue(cardStripInfoState(cardName))
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
                <ButtonLink
                    href={cardStripRytirUrl}
                    aria-label='Černý Rytíř'
                    icon={<CernyRytirLogo width={20} height={20}/>}/>
                <ButtonLink
                    href={cardStripRytirUrl}
                    aria-label='Černý Rytíř'
                    icon={<CernyRytirLogoTwo width={20} height={20}/>}
                />
                <ButtonLink
                    href={cardStripEdhrecUrl}
                    aria-label='EDHREC'
                    icon={<EDHRECLogo width={20} height={20}/>}
                />
                <ButtonLink
                    href={cardStripScryfallUrl}
                    aria-label='EDHREC'
                    icon={<EDHRECLogo width={20} height={20}/>}
                />
            </HStack>
            <Spacer/>
            <Box>
                <Text fontWeight={"semibold"}>
                    {cardStripPrice} Kč
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
                    // console.log("cardStripInfo after destroy", cardStripInfo)
                }} />
        </HStack>
    )
}

export default CardStripOptions;