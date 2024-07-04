import { gql } from "@apollo/client"

const GET_TESTIMONIALS = gql`
  query getSections($section: SectionEnum!) {
    getSections(section: $section) {
      id
      title
      sectionItems {
        edges {
          node {
            id
            name
            designation
            description
          }
        }
      }
    }
  }
`
export default GET_TESTIMONIALS
