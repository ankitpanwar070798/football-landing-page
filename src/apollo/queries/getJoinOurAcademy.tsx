import { gql } from "@apollo/client"

const GET_JOIN_OUR_ACADEMY = gql`
  query getSections($section: SectionEnum!) {
    getSections(section: $section) {
      id
      title
      descriptionEditorjs
    }
  }
`
export default GET_JOIN_OUR_ACADEMY
