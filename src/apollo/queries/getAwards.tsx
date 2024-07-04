import { gql } from '@apollo/client';

const GET_AWARDS = gql`
  query getSections($section: SectionEnum!) {
  getSections(section: $section) {
    id
    title
    description
    sectionItems {
      edges {
        node {
          id
          title
          description
          mobileImage
          desktopImage
        }
      }
    }
  }
  }
`;
export default GET_AWARDS;
