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
export const EMPLOYEES = gql`
  query {
    employees(page: { page: 0, size: 0 }) {
      totalCount
      edges {
        node {
          id
          firstName
          lastName
          gender
          phoneNo
          email
          dateOfBirth
          country
          region
          city
          subCity
          woreda
          zone
          kebele
          houseNo
          departmentId
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
