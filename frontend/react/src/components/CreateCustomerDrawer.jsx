import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    useDisclosure, Icon
} from "@chakra-ui/react";
import CreateCustomerForm from "./CreateCustomerForm.jsx";
import {BsFillTrashFill, BsPersonFillAdd} from "react-icons/bs";
import {AiFillCloseCircle} from "react-icons/ai";

const CreateCustomerDrawer = ({ fetchCustomers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button
            leftIcon={<BsPersonFillAdd/>}
            colorScheme={"teal"}
            onClick={onOpen}
        >
            Create customer
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create new customer</DrawerHeader>

                <DrawerBody>
                    <CreateCustomerForm
                        fetchCustomers={fetchCustomers}
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

export default CreateCustomerDrawer;
