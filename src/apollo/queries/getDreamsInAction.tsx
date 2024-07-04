import { gql } from "@apollo/client"

const GET_DREAMS_IN_ACTION = gql`
  query getSections($section: SectionEnum!) {
    getSections(section: $section) {
      id
      title
      description
    }
  }
`
export default GET_DREAMS_IN_ACTION
