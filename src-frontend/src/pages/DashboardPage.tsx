import { Box, Button, Container, Flex, For, Group, HStack, Input, Link, Table, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import { UserData, DomainSelect, ApiResponse, formStyle } from './ListPage';
import { ApiResponse as LoginCheck } from '../App';

const DashboardPage: React.FC = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [sessionCheck, setSessionCheck] = useState(false)
    const [username, setUsername] = useState("")

    const fetchLogin = async () => {
          try {
            let url = import.meta.env.VITE_PROXY+"login";
            const response = await fetch(url, {credentials: 'include'});
            const data: LoginCheck = await response.json();
            console.log(data.success, data.type)
      
            if (data.success && data.type === 'session' && data.username) {
              setSessionCheck(true)
              setUsername(data.username)
            } else {
                alert(sessionCheck)
                navigate('/')
                console.error("No session");
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    fetchLogin()


    const [userDatabase, setUserDatabase] = useState<UserData[]>([]);
    const [query, setQuery] = useState("")
    const [selectedParam, setSelectedParam] = useState("name")

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

    // Example function to handle search
    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault()
        // Assuming you set the `param` and `query` values from some input elements
        const param = selectedParam; // example param
        const queryValue = query; // using state for the query value
        fetchData(param, queryValue);
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
            Welcome {username}
            </Text>

            <Text maxW={"50%"} fontSize={"2vw"} pb={"2vw"}>
            Here you can see all currently enrolled students
            </Text>

            <form onSubmit={handleSearch} style={formStyle}>
            <Box
            overflow={"visible"}
            w={{base:"100%", md:"50%"}} h={{base:"40px", md:"50px"}} pl={"10px"}
            backgroundColor={"white"} borderRadius={"20px"}
            display={"inline-flex"} alignItems={"center"}>
            
                <Group attached w={"70%"}>
                <Input placeholder='Query'
                w={"100%"} unstyled h={"95%"} background={"none"} focusVisibleRing={"none"}
                color={"black"}
                onChange={(data) => {setQuery(data.target.value); handleSearch(data)}}/>
                <DomainSelect onSelectValue={setSelectedParam}/>
                </Group>
            
                <Button background={"purple.400"} ml={"2%"} h={"100%"} w={"30%"} type="submit">Find</Button>
            </Box>
            </form>
        </Flex>

        <Table.ScrollArea borderWidth="1px" w={"100%"} mt={"40px"}>
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
                            <Button bg={"red"} value={item.npm}>Delete</Button>
                            <Button bg={"yellow"} color={"black"} value={item.npm}>Edit</Button>
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
                        <Link href={`/api/cdn/${item.files}`}>
                        <Button bg="purple.400">File</Button>
                        </Link>
                    ) : item.files}
                    </Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
            </Table.Root>
        </Table.ScrollArea>


        </Container>
    )
}

export default DashboardPage
