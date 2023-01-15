import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";

export default function Question({
  type,
  title,
  choice1,
  choice2,
  onSetResponse,
}) {
  // TODO: Switch on `type` to render different question types
  // Right now we only have one

  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      flexDirection="column"
      gap="5"
    >
      <Box>
        <Heading>{title}</Heading>
      </Box>
      <HStack>
        <Box>
          <Button
            size="lg"
            colorScheme={"teal"}
            onClick={() => onSetResponse(choice1)}
          >
            {choice1}
          </Button>
        </Box>
        <Box>
          <Text>or</Text>
        </Box>
        <Box>
          <Button
            size="lg"
            colorScheme={"teal"}
            onClick={() => onSetResponse(choice2)}
          >
            {choice2}
          </Button>
        </Box>
      </HStack>
    </Box>
  );
}
