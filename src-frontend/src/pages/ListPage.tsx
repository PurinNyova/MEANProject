import { Box, Button, Container, Flex, For, Group, Input, MenuContent, MenuItem, MenuRoot, MenuTrigger, Table, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'



const DomainSelect = () => {

  const [buttonText, setButtonText] = useState("Name");

  return (
  <MenuRoot positioning={{placement: "left"}} onSelect={(details) => {setButtonText(details.value)}}>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          {buttonText}
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="nama">Nama</MenuItem>
        <MenuItem value="npm">NPM</MenuItem>
        <MenuItem value="kelas">Kelas</MenuItem>
        <MenuItem value="jurusan">Jurusan</MenuItem>
        <MenuItem value="posisi">Posisi</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}

type User = {
  _id: string;
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
  Document: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ApiResponse = {
  [key: string]: User | boolean; // Users keyed by string indices and `success` boolean
  success: boolean;
};

const ListPage: React.FC = () => {
  const [userDatabase, setUserDatabase] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/db/");
        const data: ApiResponse = await response.json();

        if (data.success) {
          // Extract user objects, ignore the 'success' field
          const users = Object.values(data).filter(
            (item): item is User => typeof item === "object"
          );
          setUserDatabase(users);
        } else {
          console.error("API returned an error or success is false.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


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

        <Box
        overflow={"visible"}
        w={{base:"100%", md:"50%"}} h={{base:"40px", md:"50px"}} pl={"10px"}
        backgroundColor={"white"} borderRadius={"20px"}
        display={"inline-flex"} alignItems={"center"}>
          
          <Group attached w={"70%"}>
            <Input placeholder='Query' w={"100%"} unstyled h={"95%"} background={"none"} focusRingColor={"none"}/>
            <DomainSelect />
          </Group>
          
          <Button background={"purple.400"} ml={"2%"} h={"100%"} w={"30%"}>Find</Button>
        </Box>
      </Flex>

      <Table.ScrollArea borderWidth="1px" w={"100%"} mt={"40px"}>
        <Table.Root size="md">
          <Table.Header>
            <Table.Row>
              <For each={["No","name", "npm", "kelas", "jurusan", "lokasiKampus", "tempatTanggalLahir", "kelamin", "alamat", "noHP", "email", "posisi", "lastIPK", "Document"]}>
                {(header, index) => <Table.ColumnHeader key={index}>{header}</Table.ColumnHeader>}
              </For>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {userDatabase.map((item: User, index: number) => (
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
                <Table.Cell>{item.Document}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>


    </Container>
  )
}

export default ListPage
