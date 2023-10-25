import React from "react";
import {
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  useColorMode,
  Container,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Column from "./Column";
import { ColumnType } from "../../enums/enums";

const KanbanComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex justifyContent="center" alignItems="center" mt={4}>
        <Heading
          fontSize={{ base: "4xl", sm: "2xl", md: "4xl" }}
          fontWeight="bold"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          mr={4}
        >
          Welcome to Axia
        </Heading>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                isActive={isOpen}
              >
                Filter by
              </MenuButton>
              <MenuList>
                <MenuItem>Option 1</MenuItem>
                <MenuItem>Option 2</MenuItem>
                <MenuItem>Option 3</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>

      <Container maxWidth="container.lg" px={4} py={10}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
          <Column column={ColumnType.TO_DO} />
          <Column column={ColumnType.IN_PROGRESS} />
          <Column column={ColumnType.BLOCKED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default KanbanComponent;