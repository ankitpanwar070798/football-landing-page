import { gql } from '@apollo/client';

const GET_SPECIALIZATIONS = gql`
  query getSpecializations{
   getSpecializations{
    id
    name
  }
  }
`;
export default GET_SPECIALIZATIONS;
