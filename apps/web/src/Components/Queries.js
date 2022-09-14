import { gql } from '@apollo/client';
export const DEPARTMENTS = gql`
  query {
    departments(page: { page: 0, size: 0 }) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
