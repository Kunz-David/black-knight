import {Suspense} from 'react';
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {cardStripsNamesState, cardStripsState} from "../atoms";
import {findCard} from "./SearchForm";
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box, Button
} from '@chakra-ui/react'
import CardItem from "./CardItem"
import HorizontalScroll from "./HorizontalScroll";
import {expandedAccordionItemsState} from "./CardStripsContainer";
import {DeleteIcon} from "@chakra-ui/icons";


const CardData = ({cardName}) => {
    const card = useRecoilValue(findCard(cardName))
    console.log("showing card data")
    return (<div>
        <h2>Card info</h2>
        <p>Status: {card.status}</p>
        <p>{card.results.toString()}</p>
    </div>)
}

function CardStrip({cardName}) {

    const cardStrip = useRecoilValue(cardStripsState(cardName))
    const removeCardStripFromFamily = useResetRecoilState(cardStripsState(cardName))
    const setCardStripNames = useSetRecoilState(cardStripsNamesState)
    const setExpandedAccordionItems = useSetRecoilState(expandedAccordionItemsState)

    const removeCardStrip = (event) => {
        removeCardStripFromFamily()
        setCardStripNames(stripNames => stripNames.filter(name => name !== cardName))
    }

    // console.log(cardName)
    // console.log(cardStrip)

    const cards = () => (cardStrip.cards.map((item, id) =>
        // <Flex key={id} flex="0 0 auto" as="nav">
        //     {item.name}
        // </Flex>
        <CardItem key={item.name + id.toString()} cardName={item.name} itemId={id}/>
    ))

    return (
        <AccordionItem>
            <h2>
                {/*<MtgCardViewer searchTerm={cardStrip.name}/>*/}
                <AccordionButton onChange={(event) => console.log("in button: " + event)}>
                    <Box flex="1" textAlign="left">
                        {cardStrip.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <Button leftIcon={<DeleteIcon />} colorScheme="red" variant="solid" onClick={removeCardStrip}>
                    Remove
                </Button>
            </h2>
            <AccordionPanel pb={4}>
                {cardStrip.name !== undefined && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <HorizontalScroll contents={cards}/>
                    </Suspense>)}
            </AccordionPanel>
        </AccordionItem>
    )
}


export default CardStrip;