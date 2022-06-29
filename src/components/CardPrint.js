import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { cardPrintProperty, cardPrintsState, cardStripInfoProperty } from "../atoms"
import { Badge, Box, Button, Center, HStack, Image, Input, Spacer, useNumberInput } from "@chakra-ui/react"
import cardConditions from "../utils/cardConditions"
import cardLanguages from "../utils/cardLanguages"
import SetIcon from './SetIcon'

function CardAmount({ cardName, printId }) {

    const [buyAmount, setBuyAmount] = useRecoilState(cardPrintProperty({ cardName, printId, path: "buyAmount" }))
    const stock = useRecoilValue(cardPrintProperty({ cardName, printId, path: "stock" }))
    const price = useRecoilValue(cardPrintProperty({ cardName, printId, path: "price" }))
    const setStripPrice = useSetRecoilState(cardStripInfoProperty({ cardName, path: "price" }))
    // const setStripPrice = useSetRecoilState(cardStripPriceState(cardName))

    const updateCardStripPrice = (val) => {
        const updateAmount = val - buyAmount
        setStripPrice(prev => prev + (updateAmount * price))
        setBuyAmount(parseInt(val))
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
            <Input {...input} value={buyAmount} />
            <Button {...inc}>+</Button>
        </HStack>
    )
}

const CardBadge = ({ children, ...restProps }) => {
    return (
        <Badge {...restProps} >
            {children}
        </Badge>
    )
}

CardBadge.defaultProps = {
    borderRadius: "full",
    px: "2",
    m: "1",
}

const CardTreatmentBadges = ({ treatments }) => {

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

const CardConditionBadge = ({ condition }) => {
    return (
        <CardBadge colorScheme={cardConditions[condition].colorScheme}>
            {condition}
        </CardBadge>
    )
}

const CardLanguageBadge = ({ language }) => {
    return (
        <CardBadge colorScheme={cardLanguages[language].colorScheme}>
            {language}
        </CardBadge>
    )
}

const CardPrint = ({ cardName, printId }) => {
    const cardPrint = useRecoilValue(cardPrintsState({ cardName, printId }))

    return (
        <Box maxW={"16rem"} borderWidth="1px" borderRadius="lg" padding={3} minWidth={"16rem"}>
            <Image src={cardPrint.rytir_image}
                alt={cardPrint.rytir_name}
                loading={"lazy"}
                fallbackSrc={"https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/revision/latest/scale-to-width-down/250?cb=20140813141013"} />
            <Box p="2" alignContent={"center"}>
                <Center>
                    {cardPrint.condition && <CardConditionBadge condition={cardPrint.condition} />}
                    {cardPrint.treatments && <CardTreatmentBadges treatments={cardPrint.treatments} />}
                    {cardPrint.language !== "English" && <CardLanguageBadge language={cardPrint.language} />}
                </Center>
                <Center>
                    {cardPrint.set}
                    <SetIcon
                        setName={cardPrint.set}
                        keyruneCode={cardPrint.keyruneCode}
                        rarity={cardPrint.rarity}
                        size="1x"
                        fixed />
                    <Spacer />
                    {cardPrint.price} Kč
                </Center>
            </Box>
            <Center>
                <CardAmount cardName={cardName} printId={printId} />
            </Center>
        </Box>
    )
}

export default CardPrint