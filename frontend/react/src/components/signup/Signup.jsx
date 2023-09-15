import {
    Flex,
    Heading,
    Link,
    Stack,
    Image, Text
} from '@chakra-ui/react';
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import CreateCustomerForm from "../shared/CreateCustomerForm.jsx";

const Signup = () =>  {

    const { customer, setCustomerFromToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(customer){
            navigate("/dashboard");
        }
    })

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Image
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk44qubktVqVXgUkQmnq6RFUekyg1qQP2UwA&usqp=CAU'
                        boxSize={"200px"}
                        alt={"Site logo "}
                    />
                    <Heading fontSize={'2xl'} mb={15}>Register your account</Heading>
                    <CreateCustomerForm
                        onSuccess={(token) => {
                            localStorage.setItem("access_token",token);
                            setCustomerFromToken();
                            navigate("/dashboard");
                        }}
                    />
                    <Link color={"blue.500"} href={"/"}>
                        Have an account? Login now!
                    </Link>
                </Stack>
            </Flex>
            <Flex
                flex={1}
                p={"10"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                bgGradient={{sm:'linear(to-r, blue.600, purple.600)'}}
            >
                <Text fontSize={"6xl"} color={'white'} fontWeight={"bold"} mb={5}>
                    <Link href={"https://amigoscode.com/courses"}>
                        Enrol now!
                    </Link>
                </Text>
                <Image
                    alt={'Login Image'}
                    objectFit={'scale-down'}
                    src={
                        'https://user-images.githubusercontent.com/40702606/215539167-d7006790-b880-4929-83fb-c43fa74f429e.png\n'
                    }
                />
            </Flex>
        </Stack>
    );
}

export default Signup;