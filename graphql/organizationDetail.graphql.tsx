import { gql } from "@apollo/client";

export const ORGANIZATION_DETAIL = gql`
  query FindOrganization($findOrganizationId: ID!) {
    findOrganization(id: $findOrganizationId) {
      id
      name
      description
      moderatorsNumber
      img
      fieldsBase
      users {
        id
        address
        nickname
        roles
      }
      epochs {
        duration
        endDate
        startDate
        id
      }
    }
  }
`;
