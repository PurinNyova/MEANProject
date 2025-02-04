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
import { useNavigate } from "react-router-dom"

interface navSess {
  sessionCheck?: boolean
}

const SideBar: React.FC<navSess> = ({sessionCheck}) => {

  const navigate = useNavigate();

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
              <Link onClick={() => navigate('/register')}>
              <Text color={{base: "black", _dark: "white"}}>Registration</Text>
              </Link>
              <Link onClick={() => navigate('/list')}>
              <Text color={{base: "black", _dark: "white"}}>List</Text>
              </Link>
              <Link onClick={() => {
                  const route = sessionCheck ? '/dashboard' : '/login';
                  navigate(route);
                  }} >
                  <Text color={{base: "black", _dark: "white"}}>{sessionCheck ? 'Dashboard' : 'Admin'}</Text>
              </Link>
            </Stack>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}

export default SideBar
