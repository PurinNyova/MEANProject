import { Text, Button, Input, Flex, Fieldset, Stack, IconButton } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react/container'
import { useContext, useState } from 'react'
import { formStyle } from './ListPage'
import { Field } from '../components/ui/field';
import { ApiResponse, PanelContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { InputGroup } from '../components/ui/input-group';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

interface LoginInterface {
  name: string;
  email: string;
  password: string;
}

const LoginPage = () => {

    const navigate = useNavigate();

    const [emptyField, setEmptyField] = useState<boolean | undefined>(false)
    const [passwordVisibility, setPasswordVisibility] = useState(false)
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
              setErrorStatus("Login Success")
              navigate('/dashboard')
          } else if (data.success && data.type === 'session') {
              setErrorStatus("Login Success")
              navigate('/dashboard')
          } else {
              setErrorStatus("Login Failed. Make sure your Password, Username, and Email, is correct")
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
          fontSize={{base:"10vw", md:"5vw"}}
        w={{base:"100%", sm:"70%"}}>
            Login
          </Text>
  
          <Text w={{base:"100%", md:"50%"}} fontSize={{base:"4vw", md:"2vw"}} pb={"4vh"}>
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
                        <InputGroup w={"100%"}
                        flex={"1"} endElement={
                          passwordVisibility ? (
                            <IconButton fontSize={"4rem"} onClick={() => setPasswordVisibility(!passwordVisibility)}><BsEyeSlash/></IconButton>
                          ) : (
                            <IconButton fontSize={"4rem"} onClick={() => setPasswordVisibility(!passwordVisibility)}><BsEye/></IconButton>
                            )
                            }>
                          <Input name='password' placeholder='Password' w={"100%"} unstyled h={"50px"}
                          focusRingColor={"none"} pl={"10px"} color={"black"}
                          backgroundColor={"white"} borderRadius={"20px"} type={passwordVisibility ? 'text' : 'password'}
                          onChange={handleInputChange}/>
                        </InputGroup>
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
