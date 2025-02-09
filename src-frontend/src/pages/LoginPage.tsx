import { Text, Button, Input, Flex, Fieldset, Stack } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react/container'
import { useContext, useState } from 'react'
import { formStyle } from './ListPage'
import { Field } from '../components/ui/field';
import { ApiResponse, PanelContext } from '../App';
import { useNavigate } from 'react-router-dom';

interface LoginInterface {
  name: string;
  email: string;
  password: string;
}

const LoginPage = () => {

    const navigate = useNavigate();

    const [emptyField, setEmptyField] = useState<boolean | undefined>(false)
    const {setErrorStatus} = useContext(PanelContext)

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

    const checkObjKey = (obj: LoginInterface) => {
            for (let key in obj) {
            const dataKey = key as keyof LoginInterface
              if (obj[dataKey] === "") {
                setEmptyField(true)
                return false
              }
            }
            return true
          }

    const handleSubmitForm = async (data: LoginInterface) => {

        if (!checkObjKey(data)) {
            setErrorStatus("Please fill the required fields")
            return
        }

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
                navigate('/dashboard')
          } else if (data.success && data.type === 'session') {
                navigate('/dashboard')
          } else {
              console.error("API returned an error or success is false.");
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
  
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
            Login
          </Text>
  
          <Text w={{base:"80%", sm:"50%"}} fontSize={{base:"3vw", sm:"2vw"}} pb={"4vh"}>
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
                    <Field label="Nama" invalid={(emptyField && loginInterface.name !== "")} >
                        <Input color={"black"} name='name' placeholder='Nama' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />

                    </Field>

                    <Field label="Email address" invalid={(emptyField && loginInterface.email !== "")}>
                        <Input name='email' placeholder='Email Address' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}/>
                    </Field>

                    <Field label="Password" invalid={(emptyField && loginInterface.password !== "")}>
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
