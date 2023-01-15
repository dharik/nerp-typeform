import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function SurveyResults() {
    return <TableContainer>
        <Table variant={"striped"}>
            <Thead>
                <Tr>
                    <Th>Date</Th>
                    <Th>Source</Th>
                    <Th>Will OpenAI Wreck Google?</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Jan 14</Td>
                    <Td>Dharik</Td>
                    <Td>Probably Not</Td>
                </Tr>
            </Tbody>
        </Table>
    </TableContainer>
}