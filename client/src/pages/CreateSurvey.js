import {  Box, Button, Container, Text, VStack } from "@chakra-ui/react";
import QuestionDataEditor from "../components/QuestionDataEditor";

export default function CreateSurvey() {
    return <Container maxW={"container.lg"} padding="10">
        <VStack>
            <QuestionDataEditor />

            <Box height="10"></Box>

            <Button colorScheme={"teal"}>Create Survey</Button>
            <Text fontSize="sm">You'll get a link to share and customize in the next step</Text>

            
        </VStack>


    </Container>
}