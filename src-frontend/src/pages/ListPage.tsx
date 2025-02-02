import { Box, Button, Container, Flex, For, Group, Input, Link, MenuContent, MenuItem, MenuRoot, MenuSelectionDetails, MenuTrigger, Table, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

interface DomainSelectProps {
  onSelectValue: (value: string) => void;
}

const DomainSelect: React.FC<DomainSelectProps> = ({onSelectValue}) => {

  const [buttonText, setButtonText] = useState("Name");

  const handleSelect = (details: MenuSelectionDetails) => {
    setButtonText(details.value)
    onSelectValue(details.value)
  }

  return (
  <MenuRoot positioning={{placement: "left"}} onSelect={handleSelect}>
      <MenuTrigger asChild>
        <Button variant="solid" size="sm" bg={"black"} color={"white"}>
          {buttonText}
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="name">Nama</MenuItem>
        <MenuItem value="npm">NPM</MenuItem>
        <MenuItem value="kelas">Kelas</MenuItem>
        <MenuItem value="jurusan">Jurusan</MenuItem>
        <MenuItem value="posisi">Posisi</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}

export type UserData = {
  _id?: string;
  name: string;
  npm: number;
  kelas: string;
  jurusan: string;
  lokasiKampus: string;
  tempatTanggalLahir: string;
  kelamin: string;
  alamat: string;
  noHP: number;
  email: string;
  posisi: string;
  lastIPK: number;
  files: string | File[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type ApiResponse = {
  [key: string]: UserData | boolean; // Users keyed by string indices and `success` boolean
  success: boolean;
};

export const formStyle: React.CSSProperties = {
  // Your style properties here
  width: "100%"
}

const ListPage: React.FC = () => {
  const { param } = useParams();
  const queries = new URLSearchParams(useLocation().search);
  const value = queries.get('value')?.toString();
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
    if (param && value) {
      fetchData(param, value)
    } else {fetchData()}
  }, []);

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
          Enrolled Students
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
              <For each={["No","Nama", "NPM", "Kelas", "Jurusan", "Lokasi Kampus", "Tempat Tanggal Lahir", "Kelamin", "Alamat", "No HP", "Email", "Posisi", "IPK", "Document"]}>
                {(header, index) => <Table.ColumnHeader key={index}>{header}</Table.ColumnHeader>}
              </For>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {userDatabase.map((item: UserData, index: number) => (
              <Table.Row key={item._id}>
                <Table.Cell>{index + 1}</Table.Cell>
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

export default ListPage
