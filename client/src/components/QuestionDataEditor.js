import { Box, Button, HStack, Icon, Input, Menu, MenuButton, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function QuestionDataEditor({ onChange }) {
    // Would be an array further down the road
    const [questionData, setQuestionData] = useState({
        type: 'binary_sentiment',
        title: 'Will OpenAI Wreck Google?',
        choice1: 'Probably not',
        choice2: 'Yah GG GOogle'
    });

    const updateQuestionData = (updatedItems) => {
        setQuestionData({
            ...questionData,
            ...updatedItems
        })
    }

    // Hard-coded form for binary_sentiment type
    return <VStack gap="4">
        <VStack boxShadow={"md"} padding="4" gap={"2"}>
            <Box display="flex" justifyContent={"space-between"} width="full" cursor={"move"} draggable>
                <Text color={"gray.400"}>
                    <Icon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </Icon>
                    &nbsp;
                    Binary Sentiment Question
                </Text>
                <Box>
                    <Icon cursor="pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </Icon>
                </Box>
            </Box>
            <Input
                placeholder="Will OpenAI Wreck Google?"
                size="lg"
                value={questionData.title}
                onChange={e => updateQuestionData({ title: e.target.value })}
            />
            <HStack>
                <Input
                    value={questionData.choice1}
                    onChange={e => updateQuestionData({ choice1: e.target.value })}
                    size="lg" />
                <Box>or</Box>
                <Input
                    value={questionData.choice2}
                    onChange={e => updateQuestionData({ choice2: e.target.value })}
                    size="lg" />
            </HStack>
        </VStack>

        <Button
            disabled size="sm"
            rightIcon={<Icon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg></Icon>
            }>Add Another Question</Button>
    </VStack>
}