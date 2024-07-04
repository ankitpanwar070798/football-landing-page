import { gql } from "@apollo/client"

const GET_VOLUNTEERS = gql`
  query getTeamsAchievements($section: TeamandAchievementEnum!) {
    getTeamsAchievements(section: $section) {
      id
    title
    description
    imageCollections {
      edges {
        node {
          id
          mobileImage
          desktopImage
        }
      }
    }
    }
  }
`
export default GET_VOLUNTEERS
