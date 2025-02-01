import { Text, Box, Button, Input, Flex, createListCollection, Fieldset, Stack, SelectRoot, SelectTrigger, SelectContent, SelectValueText, SelectItem } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react/container'
import { useState } from 'react'
import { ApiResponse, formStyle } from './ListPage'
import { Field } from '../components/ui/field';

interface LoginInterface {
  name: string;
  email: string;
  posisi: string;
  password: string;
}

const positions = createListCollection({
  items: [
    { label: "Asisten", value: "asisten" },
    { label: "Programmer", value: "programmer" },
  ],
})

const LoginPage = () => {

    const [loginInterface, setLoginInterface] = useState<LoginInterface>({
      name: "",
      email: "",
      posisi: "",
      password: ""
    })

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInterface(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(loginInterface)
    };

    const handleSubmitForm = async (data: LoginInterface) => {  
        let formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const dataKey = key as keyof LoginInterface; // Use keyof operator
                const value = data[dataKey]?.toString() || '';
                formData.append(key, value);
              }
            }

         try {
              let url = "http://localhost:3001/api/db/";
              const response = await fetch(url, {
                method: 'POST',
                body: formData
              });
              const data: ApiResponse = await response.json();
        
              if (data.success) {
                alert("Upload Successful")
              } else {
                console.error("API returned an error or success is false.");
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
        }

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
            Login
          </Text>
  
          <Text maxW={"50%"} fontSize={"2vw"} pb={"2vw"}>
          Administration Login
          </Text>
  
          <form style={formStyle}>
            

            <Fieldset.Root size="lg" maxW="2xl">
                <Stack>
                    <Fieldset.Legend>Login</Fieldset.Legend>
                    <Fieldset.HelperText>
                    Please provide your login details below.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field label="Nama">
                        <Input color={"black"} name='name' placeholder='Nama' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />

                    </Field>

                    <Field label="Email address">
                        <Input name='email' placeholder='Email Address' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}/>
                    </Field>

                    
                    <Field label="Posisi">              

                    <Box w={"100%"} overflow={"visible"} h={"50px"}>
                        <SelectRoot w={"100%"}
                        name={"posisi"} collection={positions}
                        onValueChange={(data) => {setLoginInterface(prevState => ({
                            ...prevState,
                            ["posisi"]: data.value.toString()
                        }));console.log(loginInterface)}}>
                            <SelectTrigger w={"100%"} backgroundColor={"white"} borderRadius={"20px"}>
                                <SelectValueText color={"black"} placeholder="Posisi" />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.items.map((position) => (
                                <SelectItem item={position} key={position.value}>
                                    {position.label}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectRoot>
                    </Box>
                    </Field>

                    <Field label="Password">
                        <Input name='password' placeholder='Password' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}/>
                    </Field>

                </Fieldset.Content>

                <Button background={{base:"purple.400", _dark:"white"}} h={"50px"} w={"100%"} color={{base:"white", _dark:"black"}}
                onClick={() => console.log(loginInterface)/*handleSubmitForm(loginInterface)*/}>Login</Button>
                </Fieldset.Root>
          </form>
        </Flex>
  
      </Container>
    )
}

export default LoginPage
