import { Box, Button, Container, Text, VStack } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useState } from "react";
import QuestionDataEditor from "../components/QuestionDataEditor";
import { useNavigate } from "react-router-dom";

export default function CreateSurvey() {
  const [questionData, setQuestionData] = useState(null);
  const navigate = useNavigate();

  const createQuery = useMutation("createSurvey", async (q) => {
    const r = await fetch("http://localhost:3000/api/surveys", {
      method: "POST",
      body: JSON.stringify(q),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await r.json();
    return json;
  });

  const onSave = () => {
    createQuery.mutate(questionData, {
      onSuccess: (data) => {
        navigate("/survey/" + data.ownerToken);
      },
    });
  };

  return (
    <Container maxW={"container.lg"} padding="10">
      <VStack>
        <QuestionDataEditor onChange={setQuestionData} />

        <Box height="10"></Box>

        <Button
          colorScheme={"teal"}
          onClick={onSave}
          isDisabled={questionData == null}
          isLoading={createQuery.isLoading}
        >
          Create Survey
        </Button>
        <Text fontSize="sm">
          You'll get a link to share and customize in the next step
        </Text>
      </VStack>
    </Container>
  );
}
