import React, { useEffect, useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Column from "./Column";
import { ColumnType } from "../../enums/enums";
import { useQuery } from "@apollo/client";
import { ORGANIZATION_DETAIL } from "../../graphql/organizationDetail.graphql";
import { Organization } from "../../types/organization.types";
import { useTranslation } from "react-i18next";
import ColumnGroups from "./ColumnGroups";

type KanbanComponentProps = {
  id: string;
};

const KanbanComponent = ({ id }: KanbanComponentProps) => {
  const { t } = useTranslation();

  const { colorMode, toggleColorMode } = useColorMode();
  const [orgInfo, setOrgInfo] = useState<Organization | null>(null);
  const { loading, error, data } = useQuery(ORGANIZATION_DETAIL, {
    variables: { findOrganizationId: id },
  });

  useEffect(() => {
    if (!data) return;
    console.log(data);
    setOrgInfo(data.findOrganization);
  }, [data]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <Box>
      <Flex justifyContent="start" alignItems="center" mt={4}>
        <Heading
          fontSize={{ base: "4xl", sm: "2xl", md: "4xl" }}
          fontWeight="bold"
          bgGradient="linear(to-l, #3107DA, #5E39F1)"
          bgClip="text"
          mr={4}
        >
          {`${orgInfo?.name} - ${t("dashboard.taskboardTitle")} `}
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
          {/* <ColumnGroups
            column={ColumnType.TO_DO}
            tasks={orgInfo?.tasks.filter(
              (task) => task.status === ColumnType.TO_DO
            )}
          /> */}
          {/* <Column column={ColumnType.TO_DO} />
          <Column column={ColumnType.BLOCKED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} />
          <Column column={ColumnType.COMPLETED} /> */}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default KanbanComponent;
