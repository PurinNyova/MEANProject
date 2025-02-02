import { Text, Button, Input, Flex, Fieldset, Stack } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react/container'
import { useEffect, useState } from 'react'
import { formStyle } from './ListPage'
import { Field } from '../components/ui/field';
import { ApiResponse } from '../App';
import { useNavigate } from 'react-router-dom';

interface LoginInterface {
  name: string;
  email: string;
  password: string;
}

const LoginPage = () => {

    const navigate = useNavigate();

    const [loginInterface, setLoginInterface] = useState<LoginInterface>({
      name: "",
      email: "",
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
      let urlEncodedData = new URLSearchParams();
  
      for (const key in data) {
          if (data.hasOwnProperty(key)) {
              const dataKey = key as keyof LoginInterface; // Use keyof operator
              const value = data[dataKey]?.toString() || '';
              urlEncodedData.append(key, value);
          }
      }
  
      try {
          let url = import.meta.env.VITE_PROXY+"login";
          const response = await fetch(url, {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: urlEncodedData.toString()
          });
          const data: ApiResponse = await response.json();
  
          if (data.success && data.type === 'login') {
              useEffect(() => {navigate('/dashboard')}, [])
          } else if (data.success && data.type === 'session') {
              useEffect(() => {navigate('/dashboard')}, [])
          } else {
              console.error("API returned an error or success is false.");
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
  
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

                    <Field label="Password">
                        <Input name='password' placeholder='Password' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}/>
                    </Field>

                </Fieldset.Content>

                <Button background={{base:"purple.400", _dark:"white"}} h={"50px"} w={"100%"} color={{base:"white", _dark:"black"}}
                onClick={() => /*console.log(loginInterface)*/handleSubmitForm(loginInterface)}>Login</Button>
                </Fieldset.Root>
          </form>
        </Flex>
  
      </Container>
    )
}

export default LoginPage
