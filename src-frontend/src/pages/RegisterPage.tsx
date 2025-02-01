import { Container, Flex, Text, Box, Input, Button,
    Fieldset, Stack, SelectRoot, createListCollection, SelectTrigger,
    SelectValueText, SelectContent, SelectItem, NumberInputRoot, 
    FileUploadRoot,
    FileUploadClearTrigger,} from '@chakra-ui/react';
import { formStyle } from './ListPage';
import { Field } from '../components/ui/field';
import { UserData } from './ListPage';
import { useState } from 'react';
import { NumberInputField } from '../components/ui/number-input';
import { FileUploadDropzone, FileUploadList } from '../components/ui/file-upload';
import { ApiResponse } from './ListPage';
import { CloseButton } from '../components/ui/close-button';

const RegisterPage = () => {
    const locations = createListCollection({
        items: [
          { label: "Kalimalang", value: "kalimalang" },
          { label: "Depok", value: "depok" },
          { label: "Karawaci", value: "karawaci" },
        ],
      })

      const positions = createListCollection({
        items: [
          { label: "Asisten", value: "asisten" },
          { label: "Programmer", value: "programmer" },
        ],
      })

      const kelamins = createListCollection({
        items: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      })

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
        Document: ""
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitForm = (data: UserData) => {  
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
        submission()


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
            Registration
          </Text>
  
          <Text maxW={"50%"} fontSize={"2vw"} pb={"2vw"}>
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
                    <Field label="Nama">
                        <Input color={"black"} name='name' placeholder='Nama' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>

                    <Field label="Kelas">
                        <Input name='kelas' placeholder='Kelas' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>
                    
                    <Field label="NPM">

                    <NumberInputRoot defaultValue="0" step={1} name='npm' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} display={"flex"} overflow={"hidden"}
                        backgroundColor={"white"} borderRadius={"20px"}>
                        <NumberInputField bg={"transparent"} focusVisibleRing={"none"} color={"black"} w={"100%"} onChange={handleInputChange}/>
                    </NumberInputRoot>

                    </Field>

                    <Field label="Posisi">              

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

                    <Field label="No HP">

                    <NumberInputRoot defaultValue="0" step={1} name='noHP' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} display={"flex"} overflow={"hidden"}
                        backgroundColor={"white"} borderRadius={"20px"}>
                        <NumberInputField bg={"transparent"} focusVisibleRing={"none"} color={"black"} w={"100%"} onChange={handleInputChange}/>
                    </NumberInputRoot>

                    </Field>

                    <Field label="IPK Terakhir">

                    <NumberInputRoot defaultValue="0" step={0.01} name='lastIPK' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} display={"flex"} overflow={"hidden"}
                        backgroundColor={"white"} borderRadius={"20px"}>
                        <NumberInputField bg={"transparent"} focusVisibleRing={"none"} color={"black"} w={"100%"} onChange={handleInputChange}/>
                    </NumberInputRoot>

                    </Field>

                    <Field label="Tempat Tanggal lahir (Tempat, 0 Bulan 0000)">
                        <Input name='tempatTanggalLahir' placeholder='Tempat Tanggal Lahir' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>

                    <Field label="Jurusan">
                        <Input name='jurusan' placeholder='Jurusan' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>

                    <Field label="Alamat">
                        <Input name='alamat' placeholder='Alamat' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}
                        />
                    </Field>

                    <Field label="Email address">
                        <Input name='email' placeholder='Email Address' w={"100%"} unstyled h={"50px"}
                        focusRingColor={"none"} pl={"10px"} color={"black"}
                        backgroundColor={"white"} borderRadius={"20px"}
                        onChange={handleInputChange}    />
                    </Field>

                    <Field label="Lokasi Kampus">              

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
                    
                    <Field label="Posisi">              

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
                            <FileUploadDropzone
                                
                                label="Drag and drop here to upload"
                                description=".pdf up to 5MB"
                            />
                            <FileUploadList/>
                            <FileUploadClearTrigger asChild>
                                <CloseButton
                                me="-1"
                                size="xs"
                                variant="plain"
                                focusVisibleRing="inside"
                                focusRingWidth="2px"
                                pointerEvents="auto"
                                color="fg.subtle"
                                />
                            </FileUploadClearTrigger>
                        </FileUploadRoot>
                    </Field>
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
