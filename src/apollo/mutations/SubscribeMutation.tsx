import { gql } from '@apollo/client';

const CREATE_SUBSCRIBE_MUTATION = gql`
  mutation subscribeEmail($email: String!) {
    subscribeEmail(email: $email) {
      status
      message
    }
  }
`;
export default CREATE_SUBSCRIBE_MUTATION;
