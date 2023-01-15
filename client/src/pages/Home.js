import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box
      height={"100vh"}
      width="full"
      display="flex"
      flexDir={"column"}
      justifyContent={"center"}
      alignItems="center"
    >
      Are you READY to make a new SURVEY!?!?!?1
      <Link to="/survey/new">
        <Button colorScheme="teal" size="lg">
          Create New Survey
        </Button>
      </Link>
    </Box>
  );
}
