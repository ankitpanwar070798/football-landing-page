import { gql } from "@apollo/client"

const GET_FOUNDER = gql`
  query getSections($section: SectionEnum!) {
    getSections(section: $section) {
      id
      title
      sectionItems {
        edges {
          node {
            id
            title
            description
            name
            designation
            mobileImage
            desktopImage
          }
        }
      }
    }
  }
`
export default GET_FOUNDER
