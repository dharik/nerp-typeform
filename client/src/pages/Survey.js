import { Box, Button, Container, Heading, HStack, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverTrigger, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import SurveyResults from "../components/SurveyResults"

export default function Survey() {
    // Create survey
    // Create link
    // submit survey

    return <Container maxW={"container.xl"} padding="10">
        <Box>
            <Heading>Will OpenAI Wreck Google?</Heading>
        </Box>
        <HStack>
            <Box><Button size="lg" colorScheme={"teal"}>Probably Not</Button></Box>
            <Box><Text>or</Text></Box>
            <Box><Button size="lg" colorScheme={"teal"}>Yeah GG Google</Button></Box>
        </HStack>



        <Tabs variant="line" isFitted>
            <TabList>
                <Tab>Share</Tab>
                <Tab>Responses</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Source Name</Th>
                                <Th>Response Count</Th>
                                <Th>Link URL</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    Private Edit Link
                                </Td>
                                <Td>
                                    0
                                </Td>
                                <Td>

                                </Td>
                                <Td>

                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Dharik</Td>
                                <Td>3</Td>
                                <Td>https://...
                                    <IconButton size="xs" icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                        </svg>
                                    } />

                                </Td>
                                <Td>

                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>

                    <Popover>
                        <PopoverTrigger>
                            <Button colorScheme={"teal"} size="sm">
                                Create New Share Link
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Input placeholder="Source Name" />
                            </PopoverBody>
                            <PopoverFooter
                                display='flex'
                                justifyContent={'center'}>
                                <Button>Create</Button>
                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>

                </TabPanel>
                <TabPanel>
                    <SurveyResults />

                </TabPanel>
            </TabPanels>
        </Tabs>


        <Box>

        </Box>
    </Container >
}
