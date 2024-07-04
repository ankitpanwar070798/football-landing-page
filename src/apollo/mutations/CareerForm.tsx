import { gql } from '@apollo/client';

const CAREER_FORM_MUTATION = gql`
  mutation careerForm($email: String!,$name:String!,$specialization:ID!) {
    careerForm(email: $email,name: $name,specialization:$specialization) {
      status
      message
    }
  }
`;
export default CAREER_FORM_MUTATION;
