import { Container, Flex, Text, Box, Input, Button,
    Fieldset, Stack, SelectRoot, createListCollection, SelectTrigger,
    SelectValueText, SelectContent, SelectItem, NumberInputRoot, 
    FileUploadRoot,
    FileUploadClearTrigger,
    FileUploadHiddenInput} from '@chakra-ui/react';
import { formStyle } from './ListPage';
import { Field } from '../components/ui/field';
import { UserData } from './ListPage';
import { useContext, useState } from 'react';
import { NumberInputField } from '../components/ui/number-input';
import { FileUploadDropzone, FileUploadList, FileUploadTrigger } from '../components/ui/file-upload';
import { CloseButton } from '../components/ui/close-button';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useNavigate } from 'react-router-dom';
import ButtonlessPopup from '../components/buttonlessPopup';
import { PanelContext } from '../App';
import { HiUpload } from 'react-icons/hi';

export interface ApiResponse {
    success: boolean;
    message: string;
}

export const locations = createListCollection({
    items: [
      { label: "Kalimalang", value: "kalimalang" },
      { label: "Depok", value: "depok" },
      { label: "Karawaci", value: "karawaci" },
    ],
  })

export const positions = createListCollection({
    items: [
      { label: "Asisten", value: "asisten" },
      { label: "Programmer", value: "programmer" },
    ],
  })

export const kelamins = createListCollection({
    items: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  })

const RegisterPage = () => {

    const navigate = useNavigate()
    const HCKEY: string = import.meta.env.VITE_HC_SITE_KEY
    console.log(HCKEY)

    const [isHuman, setIsHuman] = useState<boolean>(false)
    const [emptyField, setEmptyField] = useState<boolean | undefined>(false)
    const {errorStatus, setErrorStatus} = useContext(PanelContext)


    const [userData, setUserData] = useState<UserData>({
        name: "",
        npm: 0,
        kelas: "",
        jurusan: "",
        lokasiKampus: "",
        tempatTanggalLahir: "",
        kelamin: "",
        alamat: "",
        noHP: 0,
        email: "",
        posisi: "",
        lastIPK: 0,
        files: ""
    });

    const checkObjKey = (obj: UserData, exceptions: String[]) => {
        for (let key in obj) {
        const dataKey = key as keyof UserData
          if (!exceptions.includes(dataKey) && (obj[dataKey] === "" || obj[dataKey] === 0)) {
            setEmptyField(true)
            return false
          }
        }
        return true
      }
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitForm = (data: UserData) => {

        if (!checkObjKey(data, ['files'])) {
            setErrorStatus("Please fill the required fields")
            return
        }

        setEmptyField(false)

        if (!isHuman) {
            setErrorStatus("Please solve the captcha")
            return
        }

        let formData = new FormData();
        for (const key in data) {
            console.log(key)
            if (data.hasOwnProperty(key)) {
              const dataKey = key as keyof UserData; // Use keyof operator
              if (Array.isArray(data[dataKey])) {
                (data[dataKey] as File[]).forEach((file) => {
                    formData.append('files', file);
                });
              } else {
                const value = data[dataKey]?.toString() || '';
                formData.append(key, value);
              }
            }
        }
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        const submission = async () => {
         try {
              let url = import.meta.env.VITE_PROXY+"/api/db";
              const response = await fetch(url, {
                method: 'POST',
                body: formData
              });
              const data: ApiResponse = await response.json();
        
              if (data.success) {
                setErrorStatus("Upload Successful")
                navigate(0)
              } else {
                setErrorStatus(data.message)
                console.error("API returned an error or success is false.");
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
        }
        submission()
    }

    return (
      <Container maxW={"90vw"} px={4} py={{base: "50px", sm:"100px"}}>
        <Flex
        alignItems={"start"}
        flexDir={"column"}
        >
        <ButtonlessPopup dialogTitle={"Message"} dialogButtonText='Ok' openProp={errorStatus !== ""} onClickFunc={() => setErrorStatus("")}>
            <Text>{errorStatus}</Text>
        </ButtonlessPopup>

          <Text
          fontWeight={"bold"}
          fontSize={{base:"8vw", sm:"5vw"}}
          w={{base:"90%", sm:"70%"}}>
            Registration
          </Text>
  
          <Text w={{base:"80%", sm:"50%"}} fontSize={{base:"3vw", sm:"2vw"}} pb={"4vh"}>
          Psychology Lab Asistant and Programmer Registration
          </Text>
  
          <form style={formStyle}>
            

            <Fieldset.Root size="lg" maxW="2xl">
                <Stack>
                    <Fieldset.Legend>Registration Form</Fieldset.Legend>
                    <Fieldset.HelperText>
                    Please provide your contact details below.
                    </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                    <Field required label="Nama" errorText="This field is required" invalid={(emptyField && userData.name !== "")}>
                        <Input color={"black"} name='name' placeholder='Nama' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>

                    <Field required label="Kelas" invalid={(emptyField && userData.kelas !== "")} errorText="This field is required">
                        <Input name='kelas' placeholder='Kelas' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>
                    
                    <Field required label="NPM" invalid={(emptyField && userData.npm !== 0)} errorText="This field is required">

                    <NumberInputRoot defaultValue="0" step={1} name='npm' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} display={"flex"} overflow={"hidden"}
                        backgroundColor={"white"} borderRadius={"20px"}>
                        <NumberInputField bg={"transparent"} focusVisibleRing={"none"} color={"black"} w={"100%"} onChange={handleInputChange}/>
                    </NumberInputRoot>

                    </Field>

                    <Field required label="Kelamin" invalid={(emptyField && userData.kelamin !== "")} errorText="This field is required">              

                    <Box w={"100%"} overflow={"visible"} h={"50px"}>
                        <SelectRoot w={"100%"}
                        name={"kelamin"} collection={kelamins}
                        onValueChange={(data) => setUserData(prevState => ({
                            ...prevState,
                            ["kelamin"]: data.value.toString()
                        }))}>
                            <SelectTrigger w={"100%"} backgroundColor={"white"} borderRadius={"20px"}>
                                <SelectValueText color={"black"} placeholder="Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                {kelamins.items.map((position) => (
                                <SelectItem item={position} key={position.value}>
                                    {position.label}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectRoot>
                    </Box>
                    </Field>

                    <Field required label="No HP" invalid={(emptyField && userData.noHP !== 0)} errorText="This field is required">

                    <NumberInputRoot defaultValue="0" step={1} name='noHP' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} display={"flex"} overflow={"hidden"}
                        backgroundColor={"white"} borderRadius={"20px"}>
                        <NumberInputField bg={"transparent"} focusVisibleRing={"none"} color={"black"} w={"100%"} onChange={handleInputChange}/>
                    </NumberInputRoot>

                    </Field>

                    <Field required label="IPK Terakhir" invalid={(emptyField && userData.lastIPK !== 0)} errorText="This field is required">

                    <NumberInputRoot defaultValue="0" step={0.01} name='lastIPK' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} display={"flex"} overflow={"hidden"} formatOptions={{style: "decimal"}}
                        backgroundColor={"white"} borderRadius={"20px"}>
                        <NumberInputField bg={"transparent"} focusVisibleRing={"none"} color={"black"} w={"100%"} onChange={handleInputChange}/>
                    </NumberInputRoot>

                    </Field>

                    <Field required label="Tempat Tanggal lahir (Tempat, 0 Bulan 0000)" invalid={(emptyField && userData.tempatTanggalLahir !== "")} errorText="This field is required">
                        <Input name='tempatTanggalLahir' placeholder='Tempat Tanggal Lahir' w={"100%"} unstyled h={"50px"}
                        focusVisibleRing={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>

                    <Field required label="Jurusan" invalid={(emptyField && userData.jurusan !== "")} errorText="This field is required">
                        <Input name='jurusan' placeholder='Jurusan' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>

                    <Field required label="Alamat" invalid={(emptyField && userData.alamat !== "")} errorText="This field is required">
                        <Input name='alamat' placeholder='Alamat' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>

                    <Field required label="Email address" invalid={(emptyField && userData.email !== "")} errorText="This field is required">
                        <Input name='email' placeholder='Email Address' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}    />
                    </Field>

                    <Field required label="Lokasi Kampus" invalid={(emptyField && userData.lokasiKampus !== "")} errorText="This field is required">              

                        <Box w={"100%"} overflow={"visible"} h={"50px"}>
                            <SelectRoot w={"100%"}
                            name={"lokasiKampus"} collection={locations}
                            onValueChange={(data) => setUserData(prevState => ({
                                ...prevState,
                                ["lokasiKampus"]: data.value.toString()
                            }))}>
                                <SelectTrigger w={"100%"} backgroundColor={"white"} borderRadius={"20px"}>
                                    <SelectValueText color={"black"} placeholder="Lokasi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.items.map((location) => (
                                    <SelectItem item={location} key={location.value}>
                                        {location.label}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectRoot>
                        </Box>
                    </Field>
                    
                    <Field required label="Posisi" invalid={(emptyField && userData.posisi !== "")} errorText="This field is required">              

                    <Box w={"100%"} overflow={"visible"} h={"50px"}>
                        <SelectRoot w={"100%"}
                        name={"posisi"} collection={positions}
                        onValueChange={(data) => setUserData(prevState => ({
                            ...prevState,
                            ["posisi"]: data.value.toString()
                        }))}>
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

                    <Field label="Upload Dokumen">
                        <FileUploadRoot maxW="100%" alignItems="stretch" maxFiles={10} accept={"application/pdf"}
                        onFileAccept={(data) => setUserData(prevState => ({
                            ...prevState,
                            ["Document"]: data.files
                        }))}>
                            <FileUploadTrigger asChild>
                                <Button size="sm" bg="white" color={"black"} borderRadius={"20px"}>
                                <HiUpload /> Upload file
                                </Button>
                            </FileUploadTrigger>
                            <FileUploadHiddenInput />
                            <FileUploadDropzone
                                bg="white"
                                color={"black"}
                                label="Drag and drop here to upload"
                                description=".pdf up to 5MB"
                            />
                            <FileUploadList/>
                            <FileUploadClearTrigger asChild>
                                <CloseButton
                                variant="plain"
                                outline={"solid"}
                                focusVisibleRing="inside"
                                focusRingWidth="2px"
                                pointerEvents="auto"
                                color="white"
                                />
                            </FileUploadClearTrigger>
                        </FileUploadRoot>
                    </Field>
                    <HCaptcha sitekey={HCKEY} onVerify={() => setIsHuman(true)}/>
                </Fieldset.Content>

                <Button background={{base:"purple.400", _dark:"white"}} h={"50px"} w={"100%"} color={{base:"white", _dark:"black"}}
                onClick={() => {handleSubmitForm(userData); console.log(userData)}}>Register</Button>
                </Fieldset.Root>
          </form>
        </Flex>
  
      </Container>
    )
}

export default RegisterPage
