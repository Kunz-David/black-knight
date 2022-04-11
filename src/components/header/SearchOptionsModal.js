import {
    Box,
    Button, Divider,
    Flex,
    HStack, IconButton, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure, useNumberInput, VStack
} from "@chakra-ui/react";
import React from "react";
import {searchProperty, searchState} from "../../atoms";
import {useRecoilState, useResetRecoilState} from "recoil";
import {ChevronDownIcon} from "@chakra-ui/icons";
import { IoOptions} from "react-icons/io5";



function SearchBuyAmount({isDisabled}) {

    const path = "buyAmount"
    const [searchBuyAmount, setSearchBuyAmount] = useRecoilState(searchProperty(path))

    console.debug("in search buy amount ", searchBuyAmount)

    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
    } = useNumberInput({
        onChange: val => setSearchBuyAmount(parseInt(val)),
        step: 1,
        defaultValue: searchBuyAmount,
        min: 0,
        precision: 0,
    })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <HStack>
            <OptionText>
                Order Amount:
            </OptionText>
            <HStack maxW="150px">
                <Button {...dec} isDisabled={isDisabled}>-</Button>
                <Input {...input} isDisabled={isDisabled} value={searchBuyAmount}/>
                <Button {...inc} isDisabled={isDisabled}>+</Button>
            </HStack>
        </HStack>
    )
}

function OptionText({children}) {
    return (
        <Text fontWeight="bold">
            {children}
        </Text>
    )
}

function SearchOrder() {

    const path = "orderBy"
    const [searchOrderBy, setSearchOrderBy] = useRecoilState(searchProperty(path))

    console.debug("is search order ", searchOrderBy)

    return (
        <HStack>
            <OptionText>
                Order By:
            </OptionText>
            <Box>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />} minW={160}>
                                {searchOrderBy}
                            </MenuButton>
                            <MenuList>
                                <MenuOptionGroup
                                    onChange={value => setSearchOrderBy("Price - " + value)}
                                    defaultValue={searchOrderBy.match(/(?<=- ).*/gm)[0]}
                                    title="Price"
                                    type="radio">
                                    <MenuItemOption value="Asc." >Ascending</MenuItemOption>
                                    <MenuItemOption value="Desc.">Descending</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Box>
        </HStack>
    )
}


function SearchOptionsModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const useResetSearchOptions = useResetRecoilState(searchState)

    return (
        <>
            <IconButton
                icon={<IoOptions />}
                aria-label={"searchOptions"}
                onClick={onOpen}
                size={"lg"}
                variant={"solid"}
                fontSize={"1.6rem"}/>

            <Modal size={"3xl"} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Search Options</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack>
                            <HStack spacing={5}>
                                <SearchBuyAmount isDisabled={false} />
                                <SearchOrder/>
                            </HStack>
                            <Divider/>
                            <Flex>

                            </Flex>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Flex alignContent={"left"}>
                            <Button
                                variant="outline"
                                onClick={useResetSearchOptions}>
                                Reset
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SearchOptionsModal