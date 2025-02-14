import { Box, Button, Container, Flex, For, Group, HStack, Input, Link, Table, Text } from '@chakra-ui/react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import { UserData, DomainSelect, ApiResponse, formStyle } from './ListPage';
import { PanelContext } from '../App';
import Popup from '../components/popup';
import EditModal from '../components/editModal';
import React from 'react';

interface postResponse {
    message: string;
    success: boolean;
}

interface EditContextType {
    user: UserData
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setUser: React.Dispatch<React.SetStateAction<UserData>>
    emptyField: boolean;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditContext = createContext<EditContextType>({
    user: {
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
    },
    handleInputChange: () => {},
    setUser: () => {},
    emptyField: false,
    loading: true,
    setLoading: () => {}
});

const DashboardPage: React.FC = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { sessionCheck, username, setErrorStatus } = useContext(PanelContext)

    if (!sessionCheck) {
        navigate('/')
    }

    const [user, setUser] = useState<UserData>({
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

    const [emptyField, setEmptyField] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userDatabase, setUserDatabase] = useState<UserData[]>([]);
    const [query, setQuery] = useState("")
    const [selectedParam, setSelectedParam] = useState("name")
    const queryRef = useRef("")
    queryRef.current = query

    const fetchData = async (param?: string, queryValue?: string) => {
        try {
        let url = import.meta.env.VITE_PROXY+"api/db";
        if (param && queryValue) {
            url += `/${param}?value=${queryValue}`;
        }
        const response = await fetch(url);
        const data: ApiResponse = await response.json();

        if (data.success) {
            const users = Object.values(data).filter(
            (item): item is UserData => typeof item === "object" );
            setUserDatabase(users); // Assuming 'data' is the array of users
        } else {
            console.error("API returned an error or success is false.");
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };
    // Initial fetch
    useEffect(() => {
        fetchData()
    }, [location]);

    useEffect(() => {
        handleSearch()
        console.log(userDatabase)
    }, [query])

    // Example function to handle search
    const handleSearch = async () => {
        // Assuming you set the `param` and `query` values from some input elements
        const param = selectedParam; // example param
        const queryValue = queryRef.current.toString(); // using state for the query value
        await fetchData(param, queryValue);
    }

    const handleDelete = async (npm: string) => {
        try {
              let url = import.meta.env.VITE_PROXY+"api/db/del/"+npm;
              const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
              })
              const data: postResponse = await response.json();
        
              if (data.success) {
                setErrorStatus("Delete Success")
              } else {
                console.error("API returned an error or success is false.");
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const checkObjKey = (obj: UserData) => {
        for (let key in obj) {
        const dataKey = key as keyof UserData
          if (obj[dataKey] === "") {
            setEmptyField(true)
            return false
          }
        }
        return true
      }

    const handleSubmitForm = (data: UserData) => {
    
            if (!checkObjKey(data)) {
                setErrorStatus("Please fill the required fields")
                return
            }
    
            setEmptyField(false)
    
            let formData = new FormData();
            for (const key in data) {
                console.log(key)
                if (data.hasOwnProperty(key)) {
                  const dataKey = key as keyof UserData; // Use keyof operator
                    const value = data[dataKey]?.toString() || '';
                    formData.append(key, value);
                }
            }
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
    
            const submission = async () => {
             try {
                  let url = import.meta.env.VITE_PROXY+"/api/db?edit=true";
                  const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                  });
                  const data: postResponse = await response.json();
            
                  if (data.success) {
                    setErrorStatus("Edit Successful")
                    fetchData()
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

        const exportCSV = () => {
            const csvHeaders: (keyof UserData)[] = Object.keys(userDatabase[0]) as (keyof UserData)[];
            const csvRows: string[] = [];
          
            csvRows.push(csvHeaders.join(','));
          
            userDatabase.forEach(user => {
              const row = csvHeaders.map(header => {
                let value = user[header] !== undefined ? user[header] : '';
          
                if (typeof value === 'string') {
                  value = value.replace(/,/g, '.');
                }
          
                return value;
              });
              csvRows.push(row.join(','));
            });
          
            const csvString = csvRows.join('\n');

            const blob = new Blob([csvString], { type: 'text/csv' });
          
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'userDatabase.csv';
          
            link.click(); }
        

    return (
        <Container maxW={"90vw"} px={4} py={{base: "50px", sm:"100px"}} transitionDuration={"slow"} transitionProperty={"all"}>
        <Flex
        alignItems={"start"}
        flexDir={"column"}
        >

            <Text
            fontWeight={"bold"}
            fontSize={{base:"8vw", sm:"5vw"}}
            w={{base:"90%", sm:"70%"}}>
            Welcome {username}
            </Text>

            <Text w={{base:"80%", sm:"50%"}} fontSize={{base:"3vw", sm:"2vw"}} pb={"4vh"}>
            Here you can see all currently enrolled students
            </Text>

            <form onSubmit={(event) => {event.preventDefault(); handleSearch()}} style={formStyle}>
            <Box
            overflow={"visible"}
            w={{base:"100%", md:"50%"}} h={{base:"40px", md:"50px"}} pl={"10px"}
            backgroundColor={"white"} borderRadius={"20px"}
            display={"inline-flex"} alignItems={"center"}>
            
                <Group attached w={"70%"}>
                <Input placeholder='Query'
                w={"100%"} unstyled h={"95%"} background={"none"} focusVisibleRing={"none"}
                color={"black"}
                onChange={(data) => {setQuery(data.target.value)}}/>
                <DomainSelect onSelectValue={setSelectedParam}/>
                </Group>
            
                <Button background={"purple.400"} ml={"2%"} h={"100%"} w={"30%"} type="submit">Find</Button>
            </Box>
            </form>
        </Flex>

        <Box w={"100%"} mt={"40px"} flexDir={"column"}>
        <Table.ScrollArea borderWidth="1px" w={"100%"}>
            <Table.Root size="md">
            <Table.Header>
                <Table.Row>
                <For each={["No", "Action","Nama", "NPM", "Kelas", "Jurusan", "Lokasi Kampus", "Tempat Tanggal Lahir", "Kelamin", "Alamat", "No HP", "Email", "Posisi", "IPK", "Document"]}>
                    {(header, index) => <Table.ColumnHeader key={index}>{header}</Table.ColumnHeader>}
                </For>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {userDatabase.map((item: UserData, index: number) => (
                <Table.Row key={item._id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>
                        <HStack>
                            <Popup buttonText='Delete' dialogTitle='Are you sure?'
                            dialogButtonText='Delete' buttonBg={"red"}
                            onClickFunc={() => handleDelete(item.npm.toString())}><Text>If you decide to continue, this process will be irreversible</Text></Popup>
                            <EditContext.Provider value={{user, handleInputChange, emptyField, setUser, loading, setLoading}}>
                                <Popup buttonText='Edit' dialogTitle='Edit the Fields below'
                                dialogButtonText='Save' buttonBg={"yellow"} buttonColor={"black"}
                                onClickFunc={() => handleSubmitForm(user)}>
                                    <Text>If you decide to continue, this process will be irreversible</Text>
                                        <EditModal onStartFunction={() => {setUser(item)}}/>
                                </Popup>
                            </EditContext.Provider>
                        </HStack>
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.npm}</Table.Cell>
                    <Table.Cell>{item.kelas}</Table.Cell>
                    <Table.Cell>{item.jurusan}</Table.Cell>
                    <Table.Cell>{item.lokasiKampus}</Table.Cell>
                    <Table.Cell>{item.tempatTanggalLahir}</Table.Cell>
                    <Table.Cell>{item.kelamin}</Table.Cell>
                    <Table.Cell>{item.alamat}</Table.Cell>
                    <Table.Cell>{item.noHP}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.posisi}</Table.Cell>
                    <Table.Cell>{item.lastIPK}</Table.Cell>
                    <Table.Cell>
                    {item.files !== "no documents" ? (
                        <Link href={`${import.meta.env.VITE_PROXY}api/cdn/${item.files}`}>
                        <Button bg="purple.400">File</Button>
                        </Link>
                    ) : item.files}
                    </Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
       <Button bg={{base:"white", _dark:"black"}} color={{base:"black", _dark:"white"}} w={"100%"} onClick={() => exportCSV()}>Export</Button>
        </Box>
        </Container>
    )
}

export default DashboardPage
