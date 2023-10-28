import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import {
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Flex,
  SimpleGrid,
  useDisclosure,
  Card,
  CardBody,
  Text,
  Input,
  CardHeader,
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import { Organization } from "../../types/organization.types";
import { FETCH_ORGANIZATIONS } from "../../graphql/myOrganizations.graphql";
import OrganizationObject from "./OrganizationObject";
import CreateOrganizationModal from "../modal/CreateOrg.modal";
import OrganizationsTable from "./OrganizationsTable";

const organizations: Organization[] = [
  {
    id: "1",
    name: "Organization 1",
    description: "This is organization 1",
    users: [
      {
        nickname: "User 1",
      },
      {
        nickname: "User 2",
      },
    ],
    epochs: [],
  },
  {
    id: "2",
    name: "Organization 2",
    description: "This is organization 2",
    users: [
      {
        nickname: "Andrea",
      },
      {
        nickname: "Carla",
      },
    ],
    epochs: [],
  },
  {
    id: "3",
    name: "Organization 3",
    description: "This is organization 3",
    users: [
      {
        nickname: "User 1",
      },
      {
        nickname: "User 2",
      },
    ],
    epochs: [],
  },
  {
    id: "4",
    name: "Organization 4",
    description: "This is organization 4",
    users: [
      {
        nickname: "Andrea",
      },
    ],
    epochs: [],
  },
  {
    id: "5",
    name: "Organization 5",
    description: "This is organization 5",
    users: [
      {
        nickname: "User 1",
      },
      {
        nickname: "User 2",
      },
    ],
    epochs: [],
  },
];

const MyOrganizations = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery(FETCH_ORGANIZATIONS);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  useEffect(() => {
    //test
    setOrgs(organizations);
    return;
    //test

    if (!data) return;
    console.log(data.organizationsByUser);
    setOrgs(data.organizationsByUser);
  }, [data]);
  return (
    <>
      <Box mt={4} mb={8}>
        <Card>
          <CardBody>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading
                fontSize={{ base: "3xl", sm: "1xl", md: "3xl" }}
                fontWeight="bold"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                flex="1"
                mr="2"
              >
                {t("myOrganizations.title")}
              </Heading>
              <Flex flex="1" justify="flex-end" alignItems="center">
                <Input
                  placeholder="Filter by Name"
                  size="lg"
                  variant="filled"
                  width="60%"
                  marginRight="20px"
                />
                <Button
                  onClick={onOpen}
                  colorScheme="blue"
                  variant="solid"
                  leftIcon={<AddIcon />}
                  width="40%"
                >
                  {t("myOrganizations.create")}
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Box>
      <Box mt={8}>
        {orgs.length > 0 ? (
          <>
            <Card mb={8}>
              <CardHeader>
                <Heading
                  fontSize={{ base: "2xl", sm: "1xl", md: "2xl" }}
                  fontWeight="bold"
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                  flex="1"
                  mr="2"
                  textAlign={"center"}
                >
                  {t("myOrganizations.yourOrganizations")}
                </Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={3} spacing={4} width="100%">
                  {orgs.map((org, index) => (
                    <OrganizationObject org={org} key={org.id} />
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading
                  fontSize={{ base: "2xl", sm: "1xl", md: "2xl" }}
                  fontWeight="bold"
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                  flex="1"
                  mr="2"
                  textAlign={"center"}
                >
                  {t("myOrganizations.publicOrganizations")}
                </Heading>
              </CardHeader>
              <CardBody>
                <OrganizationsTable orgs={orgs} />
              </CardBody>
            </Card>
          </>
        ) : (
          <Box>
            <Heading
              fontSize={{ base: "4xl", sm: "2xl", md: "4xl" }}
              fontWeight="normal"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              textAlign={"center"}
              mt={"100px"}
            >
              {t("myOrganizations.noItems")}
            </Heading>
          </Box>
        )}
      </Box>
      <CreateOrganizationModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default MyOrganizations;
