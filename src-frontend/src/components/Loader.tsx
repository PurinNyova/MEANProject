import { Spinner, Flex } from "@chakra-ui/react";

const Loader = () => (
  <Flex justify="center" align="center" height="100vh">
    <Spinner size="xl" color="purple.500" />
  </Flex>
);

export default Loader;
