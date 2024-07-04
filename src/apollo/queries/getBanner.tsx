import { gql } from '@apollo/client';

const GET_BANNER = gql`
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
                    mobileImage
                    desktopImage
                }
            }
        }
    }
  }
`;
export default GET_BANNER;
