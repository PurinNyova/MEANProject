import { Button, Container, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { ColorModeButton } from './ui/color-mode';
import SideBar from './sidebar';
import { useNavigate } from 'react-router-dom';
import ButtonlessPopup from './buttonlessPopup';
import { useContext, useState } from 'react';
import { PanelContext } from '../App';

interface ApiResponse {
    success: string;
    type: string;
}

const navbar: React.FC = () => {

  const navigate = useNavigate();

  const { sessionCheck } = useContext(PanelContext)

  const [errorStatus, setErrorStatus] = useState("")

  const handleLogout = async () => {
    try {
            let url = import.meta.env.VITE_PROXY+"logout";
            const response = await fetch(url, {credentials: 'include', method: 'POST'});
            const data: ApiResponse = await response.json();
            console.log(data.success, data.type)
      
            if (data.success && data.type === 'logout') {
              navigate('/')
              navigate(0)
            } else {
              console.error("No session");
              setErrorStatus("No Session")
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }

  return (
    <Container maxW={"90vw"} px={4} paddingTop={"2vh"}>

        <ButtonlessPopup dialogTitle={"Message"} dialogButtonText='Ok' openProp={errorStatus !== ""} onClickFunc={() => setErrorStatus("")}>
            <Text>{errorStatus}</Text>
        </ButtonlessPopup>

        <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"row",
        }}
        >

        <Container hideFrom={"md"} p={0} w={"5px"} m={0} alignContent={"start"}><SideBar sessionCheck={sessionCheck}/></Container>

        <Text
        fontSize={{ base: "10pt", md: "12pt"}}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        color={{base: "black", _dark: "white"}}
        hideBelow={"35em"}
        onClick={() => navigate('/')}
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
            {sessionCheck === true && (
                <Button bg={{base:"purple.800", _dark:"white"}} onClick={() => handleLogout()}>Logout</Button>
            )}
            
            <ColorModeButton></ColorModeButton>

        </HStack>

        </Flex>
    </Container>
  )
}

export default navbar
