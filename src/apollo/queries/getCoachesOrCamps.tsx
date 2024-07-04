import { gql } from '@apollo/client';

const GET_COACHES_OR_CAMPS = gql`
  query getCoachesOrCamps($section: CoachandCampEnum!) {
    getCoachesOrCamps(section: $section) {
        id
        name
        designation
        description
        specializations
        studentsTrained
        availableSlots
        mobileImage
        desktopImage
        sessionName
        location
    }
  }
`;
export default GET_COACHES_OR_CAMPS;
