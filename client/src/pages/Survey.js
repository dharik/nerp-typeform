import {
  Box,
  Button,
  Container,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import Question from "../components/Question";
import SurveyLinks from "../components/SurveyLinks";
import SurveyResults from "../components/SurveyResults";

export default function Survey() {
  const { token } = useParams();
  const [response, setResponse] = useState([]);
  const queryClient = useQueryClient();
  const toaster = useToast();

  const loadSurveyQuery = useQuery(
    "survey",
    async () => {
      const r = await fetch("/api/surveys/" + token, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await r.json();
      return json;
    },
    {
      placeholderData: {
        canManage: false,
        questions: [],
      },
    }
  );

  const submitSurveyMutation = useMutation(
    "submitSurvey",
    async (responseData) => {
      const r = await fetch("/api/survey_responses", {
        method: "POST",
        body: JSON.stringify({
          token: token,
          response: responseData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await r.json();
      return json;
    },
    {
      onSuccess: () => {
        console.log("mutation success");
        queryClient.invalidateQueries("links");
        queryClient.invalidateQueries("responses");
      },
    }
  );

  if (!loadSurveyQuery.isSuccess) {
    return null;
  }

  return (
    <Container maxW={"container.xl"} padding="10">
      {submitSurveyMutation.isSuccess ? (
        <VStack gap="5">
          <Text>Thanks, your response was recorded!</Text>
          <Link to="/survey/new">
            Want to <Button colorScheme={"teal"}>Create your own survey</Button>
            ?
          </Link>
        </VStack>
      ) : (
        <Question
          {...loadSurveyQuery.data.questions[0]}
          onSetResponse={(selectedChoice) => {
            // There's only one question so I can mock
            // the whole response data object
            const r = [{ selectedChoice }];
            setResponse(r);

            // To keep things simple and scope small, just submit
            // immediately. If there were more questions, I'd have
            // a Submit button to submit all answers at once
            if (loadSurveyQuery.data.canManage) {
              toaster({
                status: "info",
                description:
                  "Responses via owner's link aren't saved. Try a different share link if you want to capture responses",
                duration: 3000,
                variant: "left-accent",
              });
            } else {
              submitSurveyMutation.mutate(r);
            }
          }}
        />
      )}

      <Spacer height="24" />

      {loadSurveyQuery.data.canManage && (
        <Tabs variant="line" isFitted>
          <TabList>
            <Tab>Share</Tab>
            <Tab>Responses</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SurveyLinks token={token} />
            </TabPanel>
            <TabPanel>
              <SurveyResults token={token} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      <Box></Box>
    </Container>
  );
}
