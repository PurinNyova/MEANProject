import { Box, Button, Container, Flex, Input, Text } from '@chakra-ui/react'
import { Cards1, Cards2, Cards3 } from '../components/cards'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const HomePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <Container maxW={"90vw"} px={4} py={{base: "50px", sm:"100px"}}>
      <Flex
      alignItems={"start"}
      flexDir={"column"}
      >
        <Text
        fontWeight={"bold"}
        fontSize={{base:"8vw", sm:"5vw"}}
        w={{base:"90%", sm:"70%"}}>
          Welcome to<br></br>Student Registration
        </Text>

        <Text w={{base:"80%", sm:"50%"}} fontSize={{base:"3vw", sm:"2vw"}} pb={"2vw"}>
        Embark on Your Educational Journey: Register Now to Unlock Opportunities in Learning and Growth
        </Text>

        <Box
        overflow={"hidden"}
        w={{base:"90%", sm:"50%"}} h={"50px"} pl={"10px"}
        backgroundColor={"white"} borderRadius={"20px"}
        display={"inline-flex"} alignItems={"center"}>
          <Input  color={"black"} placeholder='Student Name' w={"70%"} focusVisibleRing={"none"} unstyled h={"95%"} background={"none"} onChange={(data) => setQuery(data.target.value)}/>
          <Button background={"purple.400"} ml={"2%"} h={"100%"} w={"30%"} onClick={() => {navigate(`/list/name?value=${query}`)}}>Submit</Button>
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
