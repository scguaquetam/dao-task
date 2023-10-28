import { gql } from "@apollo/client";

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization(
    $createOrganizationInput: CreateOrganizationInput!
  ) {
    createOrganization(createOrganizationInput: $createOrganizationInput) {
      id
      name
      description
      img
      users {
        nickname
      }
    }
  }
`;
