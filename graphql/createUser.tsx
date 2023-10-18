import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation signUp($address: String!, $nickname: String!) {
    signUp(input: { address: $address, nickname: $nickname }) {
      token
      user {
        id
        address
        nickName
        roles
        isActive
      }
    }
  }
`;
