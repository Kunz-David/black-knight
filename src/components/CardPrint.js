import React from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {cardPrintProperty, cardPrintsState} from "../atoms";
import {Badge, Box, Button, Center, HStack, Image, Input, Spacer, useNumberInput} from "@chakra-ui/react";
import cardConditions from "../utils/cardConditions";
import cardLanguages from "../utils/cardLanguages";
import {cardStripPriceState} from "./CardStripOptions";

function CardAmount({cardName, printId}) {

    // get buyAmount
    const [buyAmount, setBuyAmount] = useRecoilState(cardPrintProperty({cardName, printId, path: "buyAmount"}))

    // get stock
    const stock = useRecoilValue(cardPrintProperty({cardName, printId, path: "stock"}))

    // get price
    const price = useRecoilValue(cardPrintProperty({cardName, printId, path: "price"}))

    const setStripPrice = useSetRecoilState(cardStripPriceState(cardName))

    const updateCardStripPrice = (val) => {
        const updateAmount = val - buyAmount
        setStripPrice(prev => prev + (updateAmount * price))
        // update buyAmount
        setBuyAmount(val)
    }

    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
    } = useNumberInput({
        onChange: updateCardStripPrice,
        step: 1,
        defaultValue: buyAmount,
        min: 0,
        max: stock,
        precision: 0,
    })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps({ isReadOnly: false })

    return (
        <HStack maxW="150px">
            <Button {...dec}>-</Button>
            <Input {...input} value={buyAmount}/>
            <Button {...inc}>+</Button>
        </HStack>
    )
}

const CardBadge = ({children, ...restProps}) => {
    return (
        <Badge {...restProps} >
            {children}
        </Badge>
    )
}

CardBadge.defaultProps = {
    borderRadius: "full",
    px: "2",
};

const CardTreatmentBadges = ({treatments}) => {

    return (
        <div>
            {treatments.map(treatment =>
                <CardBadge key={treatment} bgGradient="linear(to-r, cyan.300, green.300, pink.400)" textColor={"black"}>
                    {treatment}
                </CardBadge>
            )}
        </div>
    )
}

const CardConditionBadge = ({condition}) => {
    return (
        <CardBadge colorScheme={cardConditions[condition].colorScheme}>
            {condition}
        </CardBadge>
    )
}

const CardLanguageBadge = ({language}) => {
    return (
        <CardBadge colorScheme={cardLanguages[language].colorScheme}>
            {language}
        </CardBadge>
    )
}

const CardPrint = ({cardName, printId}) => {
    const cardPrint = useRecoilValue(cardPrintsState({cardName, printId}))

    return (
        <Box maxW={"16rem"} borderWidth="1px" borderRadius="lg" padding={3} minWidth={"16rem"}>
            <Image src={cardPrint.rytir_image}
                   alt={cardPrint.rytir_name}
                   loading={"lazy"}
                   fallbackSrc={"https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/revision/latest/scale-to-width-down/250?cb=20140813141013"}/>
            <Box p="2">

                {cardPrint.condition && <CardConditionBadge condition={cardPrint.condition} />}
                {cardPrint.treatments && <CardTreatmentBadges treatments={cardPrint.treatments} />}
                {cardPrint.language !== "English" && <CardLanguageBadge language={cardPrint.language} />}
                <Spacer />
                {cardPrint.set}
            </Box>
            <Center>
                <CardAmount cardName={cardName} printId={printId}/>
            </Center>
        </Box>
    )
};

export default CardPrint;