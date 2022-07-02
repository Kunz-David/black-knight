import { Box, Heading, HStack, IconButton, Spacer, Text } from "@chakra-ui/react"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { DeleteIcon } from "@chakra-ui/icons"
import { cardStripInfoProperty } from "../../atoms"
import { useDestroyStrip } from "../../utils/destroyStrip"
import { ReactComponent as CernyRytirLogo } from '../../assets/cerny_rytir_ver1.svg'
import { ReactComponent as CernyRytirLogoTwo } from '../../assets/cerny_rytir_ver2.svg'
import { ReactComponent as EDHRECLogo } from '../../assets/edhrec.svg'
import { ReactComponent as ScryfallLogo } from '../../assets/scryfall_unified_color.svg'
import ManaCost from './print/ManaCost'
import PropTypes from "prop-types"
import { cardStripPropType } from "../../propTypes"
import CardTypeIcons from "./print/CardTypeIcons"
import { get } from "lodash"

ButtonLink.propTypes = {
    href: PropTypes.string
}

function ButtonLink({ href, ...ButtonLinkProps }) {

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


CardStripOptions.propTypes = cardStripPropType

// FIXME: buttons are in collapse, so clicking them also colapses

function CardStripOptions({ cardName }) {

    const cardFaces = useRecoilValue(cardStripInfoProperty({ cardName, path: "card_faces" }))

    const cardStripManaCost = cardFaces.map(obj => get(obj, "mana_cost"))
    const cardStripTypeLine = cardFaces.map(obj => get(obj, "type_line"))

    const setCardStripVisible = useSetRecoilState(cardStripInfoProperty({ cardName, path: "visible" }))
    const cardStripPrice = useRecoilValue(cardStripInfoProperty({ cardName, path: "price" }))
    const cardStripRytirUrl = useRecoilValue(cardStripInfoProperty({ cardName, path: "rytir_url" }))
    const cardStripEdhrecUrl = useRecoilValue(cardStripInfoProperty({ cardName, path: "edhrec_url" }))
    const cardStripScryfallUrl = useRecoilValue(cardStripInfoProperty({ cardName, path: "scryfall_url" }))
    // const cardStripManaCost = useRecoilValue(cardStripInfoProperty({ cardName, path: "mana_cost" }))
    // const cardStripTypeLine = useRecoilValue(cardStripInfoProperty({ cardName, path: "type_line" }))


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
                <CardTypeIcons typeLine={cardStripTypeLine} />
                <Box p="2">
                    <Heading size="md">{cardName}</Heading>
                </Box>
                <ButtonLink
                    href={cardStripRytirUrl}
                    aria-label='Černý Rytíř'
                    icon={<CernyRytirLogo width={20} height={20} />} />
                <ButtonLink
                    href={cardStripRytirUrl}
                    aria-label='Černý Rytíř'
                    icon={<CernyRytirLogoTwo width={20} height={20} />}
                />
                <ButtonLink
                    href={cardStripEdhrecUrl}
                    aria-label='EDHREC'
                    icon={<EDHRECLogo width={20} height={20} />}
                />
                <ButtonLink
                    href={cardStripScryfallUrl}
                    aria-label='Scryfall'
                    icon={<ScryfallLogo width={20} height={20} />}
                />
            </HStack>
            <Spacer />
            <ManaCost value={cardStripManaCost} />
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

export default CardStripOptions