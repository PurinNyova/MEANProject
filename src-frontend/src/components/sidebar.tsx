import { Button, Icon, Link, Stack, StackSeparator, Text } from "@chakra-ui/react"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { GiHamburgerMenu } from "react-icons/gi"

const SideBar: React.FC = () => {
  return (
    <DrawerRoot placement={"start"}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="solid" size="sm" bg={"purple.400"}>
          <Icon><GiHamburgerMenu /></Icon>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Universitas Gunadarma</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
            <Stack justifyContent={"space-evenly"} minW={"50%"} fontWeight={"bold"} separator={<StackSeparator />}>
                <Link href='/register'>
                <Text color={{base: "black", _dark: "white"}}>Pendaftaran</Text>
                </Link>
                <Link href='/list'>
                <Text color={{base: "black", _dark: "white"}}>List Mahasiswa</Text>
                </Link>
                <Link href='/admin'>
                <Text color={{base: "black", _dark: "white"}}>Administrasi</Text>
                </Link>
            </Stack>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}

export default SideBar
