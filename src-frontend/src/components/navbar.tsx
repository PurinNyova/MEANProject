import { Button, Container, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { ColorModeButton } from './ui/color-mode';
import SideBar from './sidebar';

const navbar = () => {
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
            <Link href='/register'>
            <Text color={{base: "black", _dark: "white"}}>Pendaftaran</Text>
            </Link>
            <Link href='/list'>
            <Text color={{base: "black", _dark: "white"}}>List Mahasiswa</Text>
            </Link>
            <Link href='/admin'>
            <Text color={{base: "black", _dark: "white"}}>Administrasi</Text>
            </Link>
        </HStack>

        <HStack alignItems={"center"}>
            {location.pathname !== "/" && ( // Show the Home button only if not on the root route
              <Link href={"/"}>
                <Button bg={"green.400"}>Home</Button>
              </Link>
            )}
            <Link href={"/about"}>
            <Button bg={"purple.400"}>About</Button>
            </Link>
            <ColorModeButton></ColorModeButton>

        </HStack>

        </Flex>
    </Container>
  )
}

export default navbar
