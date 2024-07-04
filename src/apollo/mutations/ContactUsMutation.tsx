import { gql } from "@apollo/client"

const CREATE_CONTACT_US_MUTATION = gql`
  mutation contactForm(
    $contactNumber: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $message: String!
  ) {
    contactForm(
      contactNumber: $contactNumber
      email: $email
      firstName: $firstName
      lastName: $lastName
      message: $message
    ) {
      status
      message
    }
  }
`

export default CREATE_CONTACT_US_MUTATION
