import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "react-query";

export default function SurveyResults({ token }) {
    const responsesQuery = useQuery('responses', async () => {
        const r = await fetch('http://localhost:3000/api/survey_responses?token=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await r.json();
        return json;
    }, {
        placeholderData: []
    })


    return <TableContainer>
        <Table variant={"striped"}>
            <Thead>
                <Tr>
                    <Th>Date</Th>
                    <Th>Source</Th>
                    <Th>Response Data</Th>
                </Tr>
            </Thead>
            <Tbody>
                {responsesQuery.data.map(r => {
                    return <Tr key={r.id}>
                        <Td>{r.createdAt}</Td>
                        <Td>{r.source}</Td>
                        <Td>{JSON.stringify(r.data)}</Td>
                    </Tr>
                })}
            </Tbody>
        </Table>
    </TableContainer>
}