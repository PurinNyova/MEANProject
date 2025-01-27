import { Box, Button, Container, Flex, Input, Text } from '@chakra-ui/react'
import { Cards1, Cards2, Cards3 } from '../components/cards'

const HomePage = () => {
  return (
    <Container maxW={"90vw"} px={4} py={{base: "100px", sm:"50px"}}>
      <Flex
      alignItems={"start"}
      flexDir={"column"}
      >
        <Text
        fontWeight={"bold"}
        fontSize={"5vw"}
        maxW={"70%"}>
          Welcome to<br></br>Student Registration
        </Text>

        <Text maxW={"50%"} fontSize={"2vw"} pb={"2vw"}>
        Embark on Your Educational Journey: Register Now to Unlock Opportunities in Learning and Growth
        </Text>

        <Box
        overflow={"hidden"}
        w={"50%"} h={"50px"} pl={"10px"}
        backgroundColor={"white"} borderRadius={"20px"}
        display={"inline-flex"} alignItems={"center"}>
          <Input placeholder='Student Name' w={"70%"} unstyled h={"95%"} background={"none"}/>
          <Button background={"purple.400"} ml={"2%"} h={"100%"} w={"30%"}>Submit</Button>
        </Box>

        <Flex justifyContent={"space-between"} w={"100%"} mt={"30px"} direction={{ base: "column", md: "row" }}>
          <Cards1 />
          <Cards2 />
          <Cards3 />
        </Flex>
      </Flex>
    </Container>
  )
}

export default HomePage
