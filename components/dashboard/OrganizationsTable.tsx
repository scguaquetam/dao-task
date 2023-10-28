import {
  Avatar,
  Card,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Organization } from "../../types/organization.types";
import { useTranslation } from "react-i18next";
type MyOrganizationsTableProps = {
  orgs: Organization[];
};

const OrganizationsTable = ({ orgs }: MyOrganizationsTableProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>{t("myOrganizations.table.organization")}</Th>
              <Th isNumeric>{t("myOrganizations.table.contributors")}</Th>
              <Th isNumeric>{t("myOrganizations.table.moderators")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orgs.map((org, index) => (
              <Tr key={index}>
                <Td>
                  <Avatar 
                    size="sm" 
                    name={org.name} 
                    src={org.img || "/images/standarAvatar.png"} 
                  />
                </Td>
                <Td>{org.name}</Td>
                <Td isNumeric>{org.users.length}</Td>
                <Td isNumeric>3</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default OrganizationsTable;
