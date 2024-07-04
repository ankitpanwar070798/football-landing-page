import { gql } from "@apollo/client"

const GET_TEAMS_ACHIEVEMENTS = gql`
  query getSections($section: SectionEnum!) {
    getSections(section: $section) {
      id
      title
      sectionItems {
        edges {
          node {
            id
            mobileImage
            desktopImage
            participationStatus 
            year
            place
            location
          }
        }
      }
    }
  }
`
export default GET_TEAMS_ACHIEVEMENTS
