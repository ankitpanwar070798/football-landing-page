import { gql } from '@apollo/client';

const GET_VIDEO = gql`
  query getSections($section: SectionEnum!) {
  getSections(section: $section) {
    id
    title
    description
    video
  }
  }
`;
export default GET_VIDEO;
