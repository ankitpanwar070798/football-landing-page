import { gql } from "@apollo/client"

const GET_TRUSTEES = gql`
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
            mobileImage
            desktopImage
          }
        }
      }
    }
  }
`
export default GET_TRUSTEES
