import { gql } from "@apollo/client";

export const FETCH_ORGANIZATIONS = gql`
  query OrganizationsByUser {
    organizationsByUser {
      id
      name
      description
      users {
        nickname
      }
    }
  }
`;
