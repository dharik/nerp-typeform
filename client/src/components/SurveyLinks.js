import {
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function SurveyLinks({ token }) {
  const [name, setName] = useState("My Friend Sally");
  const queryClient = useQueryClient();

  const tokensQuery = useQuery(
    "links",
    async () => {
      const r = await fetch(
        "/api/survey_tokens?token=" + token,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await r.json();
      return json;
    },
    {
      placeholderData: [],
    }
  );

  const createTokenMutation = useMutation(
    "createToken",
    async (name) => {
      const r = await fetch(
        "/api/survey_tokens?token=" + token,
        {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await r.json();
      return json;
    },
    {
      onSuccess: () => {
        setName("");
        queryClient.invalidateQueries("links");
      },
    }
  );

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Source Name</Th>
            <Th>Response Count</Th>
            <Th>Link URL</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokensQuery.data.map((token) => {
            return (
              <Tr key={token.token}>
                <Td>{token.name}</Td>
                <Td>{token.response_count}</Td>
                <Td>
                  <Input value={token.token} variant="filled" />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Popover>
        <PopoverTrigger>
          <Button colorScheme={"teal"} variant="outline">
            Create New Share Link
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Input
              placeholder="Source Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent={"center"}>
            <Button
              colorScheme={"teal"}
              onClick={() => createTokenMutation.mutate(name)}
              isLoading={createTokenMutation.isLoading}
            >
              Create
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </TableContainer>
  );
}
