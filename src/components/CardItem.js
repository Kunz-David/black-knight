import React from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {cardStripProperty, cardStripsState} from "../atoms";
import {Badge, Box, Button, Center, HStack, Image, Input, Spacer, useNumberInput} from "@chakra-ui/react";
import cardConditions from "../utils/cardConditions";


// function CardAmountProperty({label, path, cardName}) {
//     const [value, setValue] = useRecoilState(cardStripProperty({cardName, path}))
//     return <PropertyInput label={label} value={value} onChange={setValue} />
// }
//
// const PropertyInput = ({label, value, onChange}) => {
//     return (
//         <div>
//             <Text fontSize="14px" fontWeight="500" mb="2px">
//                 {label}
//             </Text>
//             <InputGroup size="sm" variant="filled">
//                 <NumberInput value={value} onChange={(_, value) => onChange(value)}>
//                     <NumberInputField borderRadius="md" />
//                     <InputRightElement pointerEvents="none" children="px" lineHeight="1" fontSize="12px" />
//                 </NumberInput>
//             </InputGroup>
//         </div>
//     )
// }


function CardAmount({cardName, itemId}) {

    // get buyAmount
    let path = `cards[${itemId}].buyAmount`
    const [buyAmount, setBuyAmount] = useRecoilState(cardStripProperty({cardName, path}))

    // get stock
    path = `cards[${itemId}].stock`
    const cardStock = useRecoilValue(cardStripProperty({cardName, path}))

    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
    } = useNumberInput({
        onChange: val => setBuyAmount(val),
        step: 1,
        defaultValue: buyAmount,
        min: 0,
        max: cardStock,
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

const CardConditionBadge = ({condition}) => {
    return (<Badge borderRadius="full" px="2" colorScheme={cardConditions[condition].colorScheme}>
        {condition}
    </Badge>)
}

const CardItem = ({cardName, itemId}) => {
    const cardStrip = useRecoilValue(cardStripsState(cardName))
    const card = cardStrip.cards[itemId]

    // console.log(itemId)
    // console.log(card)

    return (
        <Box maxW={"16rem"} borderWidth="1px" borderRadius="lg" padding={3} minWidth={"16rem"}>
            <Image src={card.rytir_image} alt={card.rytir_name} />
            <Box p="2">
                <CardConditionBadge condition={card.condition}/>
                <Spacer/>
                {cardStrip.cards[itemId].set}
            </Box>
            <Center>
                <CardAmount cardName={cardName} itemId={itemId}/>
            </Center>
        </Box>
    )
};

export default CardItem;