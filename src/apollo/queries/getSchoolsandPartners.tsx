import { gql } from "@apollo/client"

const GET_SCHOOLS_AND_PARTNERS = gql`
  query SchoolsandPartners($section: TeamandAchievementEnum!) {
    getTeamsAchievements(section: $section) {
      id
      title
      subTitle
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
export default GET_SCHOOLS_AND_PARTNERS
