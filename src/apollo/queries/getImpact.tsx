import { gql } from "@apollo/client"

const GET_IMPACT = gql`
  query TeamofVolunteers($section: TeamandAchievementEnum!) {
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
            statsCount
          }
        }
      }
    }
  }
`
export default GET_IMPACT
