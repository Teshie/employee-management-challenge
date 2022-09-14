import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { DEPARTMENTS } from '../Components/Queries';
import { client } from '../main';
import DepartmentData from './DepartmentData';

const Departments = () => {
  const { loading: loading, error: error, data: data } = useQuery(DEPARTMENTS);
  console.log(data);
  const createSubCat = () => {
    client
      .mutate({
        mutation: gql`
          mutation {
            createDepartment(input: { name: "Computer" }) {
              id
            }
          }
        `,
      })
      .then((res: any) => {
        alert('success');
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <div className="text-red-500">
      <div className="App">
        <form>
          <input
            id="file"
            type="file"
            // The onChange should trigger updates whenever
            // the value changes?
            // Try to select a file, then try selecting another one.
            multiple
          />

          <br />

          <button type="button" onClick={() => createSubCat()}>
            Another
          </button>
        </form>
      </div>
      <DepartmentData />
    </div>
  );
};

export default Departments;
