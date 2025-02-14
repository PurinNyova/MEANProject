import { ReactNode } from "react";
import { Card, Icon } from "@chakra-ui/react";
//import { Button } from "@chakra-ui/react";
import { BsAsterisk, BsBook } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useColorMode } from "./ui/color-mode";

interface CardBodyProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const CardBody: React.FC<CardBodyProps> = ({ icon, title, description }) => {
    return (
        <Card.Body gap="2">
            <Icon fontSize={40}>{icon}</Icon>
            <Card.Title mt="2">{title}</Card.Title>
            <Card.Description color={"inherit"}>{description}</Card.Description>
        </Card.Body>
    )
}

const CardFooter: React.FC = () => (
  <Card.Footer justifyContent="flex-end">
  </Card.Footer>
);

// <Button bg={"purple.400"}>View</Button>

export const Cards1: React.FC = () => {
    const { colorMode } = useColorMode();
    return (
      <Card.Root
        width={{ base: "100%", md: "30%" }}
        mb={{ base: "30px", md: "0px" }}
        bg={{ _hover: "purple.300" }}
        transition={"backgrounds"}
        boxShadow={{ _hover: "md" }}
        border={"none"}
        color={colorMode === "dark" ? { _hover: "black" } : {}}
      >
        <CardBody
          icon={<BsBook />}
          title="Easy Enrollment"
          description="Effortlessly enroll with your code and payment method. Experience a speedy registration process and enjoy our complimentary segmented services."
        />
        <CardFooter />
      </Card.Root>
    );
  };
  
  export const Cards2: React.FC = () => {
    const { colorMode } = useColorMode();
    return (
      <Card.Root
        width={{ base: "100%", md: "30%" }}
        mb={{ base: "30px", md: "0px" }}
        bg={{ _hover: "purple.300" }}
        transition={"backgrounds"}
        boxShadow={{ _hover: "md" }}
        border={"none"}
        color={colorMode === "dark" ? { _hover: "black" } : {}}
      >
        <CardBody
          icon={<BsAsterisk />}
          title="Quick Update"
          description="Stay informed with real-time updates and never miss a beat. Our system ensures continuous updates tailored to your needs."
        />
        <CardFooter />
      </Card.Root>
    );
  };
  
  export const Cards3: React.FC = () => {
    const { colorMode } = useColorMode();
    return (
      <Card.Root
        width={{ base: "100%", md: "30%" }}
        mb={{ base: "30px", md: "0px" }}
        bg={{ _hover: "purple.300" }}
        transition={"backgrounds"}
        boxShadow={{ _hover: "md" }}
        border={"none"}
        color={colorMode === "dark" ? { _hover: "black" } : {}}
      >
        <CardBody
          icon={<MdOutlineSupportAgent />}
          title="24/7 Support"
          description="We're here for you around the clock. Reach out to our support team anytime, and we'll assist you promptly with any issues or inquiries."
        />
        <CardFooter />
      </Card.Root>
    );
  }