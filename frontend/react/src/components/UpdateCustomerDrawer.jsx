import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import {AiFillCloseCircle} from "react-icons/ai";
import {FaWrench} from "react-icons/fa";
import UpdateCustomerForm from "./UpdateCustomerForm.jsx";
import React from "react";

const UpdateCustomerDrawer = ({ fetchCustomers, initialValues, customerId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button
            bg={"gray.200"}
            color={"black"}
            rounded={"full"}
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
            }}
            leftIcon={<FaWrench/>}
            onClick={onOpen}
        >
            Update
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Update customer</DrawerHeader>

                <DrawerBody>
                    <UpdateCustomerForm
                        fetchCustomers={fetchCustomers}
                        initialValues={initialValues}
                        customerId={customerId}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        leftIcon={<AiFillCloseCircle/>}
                        colorScheme={"teal"}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}

export default UpdateCustomerDrawer;
