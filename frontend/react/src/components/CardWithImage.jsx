import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    HStack,
    Tag,
    useColorModeValue,
    Button,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody, AlertDialogFooter,
} from '@chakra-ui/react';
import React from "react";
import {BsFillTrashFill} from "react-icons/bs";
import {deleteCustomer} from "../services/client.js";
import {errorNotification, successNotification} from "../services/notification.js";
import UpdateCustomerDrawer from "./UpdateCustomerDrawer.jsx";

export default function CardWithImage({id, name, email, age, gender, imageNumber, fetchCustomers}) {

    const genderURL = gender === "MALE" ? "men" : "women";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    return (
        <Center py={6}>
            <Box
                maxW={'300px'}
                minW={'300px'}
                w={'full'}
                m={2}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'lg'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'120px'}
                    w={'full'}
                    src={
                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    }
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={
                            `https://randomuser.me/api/portraits/${genderURL}/${imageNumber}.jpg`
                        }
                        alt={'Author'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={2} align={'center'} mb={5}>
                        <Tag borderRadius={"full"}>{id}</Tag>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'}>{email}</Text>
                        <Text color={'gray.500'}>Age {age} | {gender} </Text>
                    </Stack>
                </Box>

                <Stack direction={"row"} justify={"center"} spacing={6} p={4}>
                    <Stack>
                        <UpdateCustomerDrawer
                            fetchCustomers={fetchCustomers}
                            initialValues={{ name, email, age }}
                            customerId={id}
                        />
                    </Stack>
                    <Stack>
                        <Button
                            bg={"red.400"}
                            color={"white"}
                            rounded={"full"}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            _focus={{
                                bg: "green.500"
                            }}
                            leftIcon={<BsFillTrashFill/>}
                            onClick={onOpen}
                        >
                            Delete
                        </Button>


                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Delete {name}
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure you want delete {name}? You can't undo this action afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme='red' onClick={() => {
                                            deleteCustomer(id)
                                                .then(res => {
                                                    console.log(res);
                                                    successNotification(
                                                        "Customer delete",
                                                        `${name} was successfully delete`
                                                    );
                                                    fetchCustomers();
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                    errorNotification(
                                                        err.code,
                                                        err.response.data.message
                                                    )
                                                })
                                                .finally(() => {
                                                    onClose()
                                                })
                                        }} ml={3}>
                                            Delete
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Stack>

                </Stack>

            </Box>
        </Center>
    );

}

