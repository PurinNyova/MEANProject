import { Button, Container, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { ColorModeButton } from './ui/color-mode';
import SideBar from './sidebar';
import { useNavigate } from 'react-router-dom';

interface navSess {
  sessionCheck?: boolean
}

const navbar: React.FC<navSess> = ({sessionCheck}) => {

  const navigate = useNavigate();

  return (
    <Container maxW={"90vw"} px={4} paddingTop={"2vh"}>
        <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row"
        }}
        >

        <Container hideFrom={"md"} p={0} w={"5px"} m={0} alignContent={"start"}><SideBar /></Container>

        <Text
        fontSize={{ base: "10pt", md: "12pt"}}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        color={{base: "black", _dark: "white"}}
        hideBelow={"40em"}
        >
        Universitas Gunadarma
        </Text>

        <HStack justifyContent={"space-evenly"} minW={"50%"} hideBelow={"md"} fontWeight={"bold"}>
            <Link onClick={() => navigate('/register')}>
            <Text color={{base: "black", _dark: "white"}}>Registration</Text>
            </Link>
            <Link onClick={() => navigate('/list')}>
            <Text color={{base: "black", _dark: "white"}}>List</Text>
            </Link>
            <Link onClick={() => {
                const route = sessionCheck ? '/dashboard' : '/login';
                navigate(route);
            }} >
                <Text color={{base: "black", _dark: "white"}}>{sessionCheck ? 'Dashboard' : 'Admin'}</Text>
            </Link>
        </HStack>

        <HStack alignItems={"center"}>
            {location.pathname !== "/" && ( // Show the Home button only if not on the root route
                <Button bg={"green.400"} onClick={() => navigate('/')}>Home</Button>
            )}
            <Button bg={"purple.400"} onClick={() => navigate('/about')}>About</Button>
            <ColorModeButton></ColorModeButton>

        </HStack>

        </Flex>
    </Container>
  )
}

export default navbar
