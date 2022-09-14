import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { DEPARTMENTS } from '../Components/Queries';
import { client } from '../main';

const Departments = () => {
  const { loading: loading, error: error, data: data } = useQuery(DEPARTMENTS);
  const [showCreate, setShowCreate] = useState<Boolean>(false);
  const [name, setName] = useState<string>('');
  const [showUpdate, setShowUpdate] = useState<Boolean>(false);
  const [depId, setDepId] = useState<string>('');
  const [success, setSuccess] = useState<Boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const toggleSuccess = () => setSuccess(!success);
  const toggleCreate = () => setShowCreate(!showCreate);
  const toggleUpdate = () => setShowUpdate(!showUpdate);

  const CreateDepartment = (e: any) => {
    e.preventDefault();
    client
      .mutate({
        mutation: gql`
          mutation {
            createDepartment(input: { name: "${name}" }) {
              id
            }
          }
        `,
      })
      .then((res: any) => {
        alert('success');
        window.location.reload();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const deleteDepartment = (e: any) => {
    e.preventDefault();
    client
      .mutate({
        mutation: gql`
          mutation {
            deleteDepartment(id: "${depId}") {
              id
              name
            }
          }
        `,
      })
      .then((res: any) => {
        alert('success');
        window.location.reload();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const updateDepartment = (e: any) => {
    e.preventDefault();
    client
      .mutate({
        mutation: gql`
          mutation {
            updateDepartment(input: { id: "${depId}", name: "${name}" }) {
              id
            }
          }
        `,
      })
      .then((res: any) => {
        alert('success');
        window.location.reload();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const DisplayData = data?.departments?.edges
    ?.filter((row: any) => row?.node?.name?.match(new RegExp(searchValue, 'i')))
    ?.map((items: any) => {
      return (
        <tr
          key={items?.node?.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td className="px-6 py-4">{items?.node?.id}</td>
          <td className="px-6 py-4">{items?.node?.name}</td>
          <td className="px-6 py-3">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {items?.node?.employees?.map((x: any) => (
                <option>
                  {x.firstName} {x.lasttName}
                </option>
              ))}
            </select>
          </td>
          <td className="px-6 py-4 text-right flex space-x-4">
            <p
              onClick={() => {}}
              className="font-medium text-green-600 dark:text-blue-500 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                onClick={() => {
                  setDepId(items?.node?.id);
                  setName(items?.node?.name);
                  toggleUpdate();
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </p>
            <p className="text-red-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                onClick={() => {
                  setDepId(items?.node?.id);
                  toggleSuccess();
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </p>
          </td>
        </tr>
      );
    });
  return (
    <div className="text-red-500 p-10">
      <div className="flex flex-col mt-24 space-y-6">
        <div className="flex justify-between items-center ">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="description"
              id="desc"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-gray-50 flex-1 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-[20rem] p-2.5  "
              placeholder="Search Employee By Name..."
              required
            />
          </div>
          <div className="input-group  relative    ">
            <button
              onClick={() => {
                toggleCreate();
              }}
              className="btn flex rounded-2xl text-white  px-7 py-3 bg-blue-600"
              type="button"
              id="button-addon2"
            >
              Add Department
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {loading ? (
            <div className="flex flex-col justify-center items-center mt-10">
              <div className="flex items-center justify-center ">
                <div className="w-24 h-24 border-t-4 border-b-4 border-green-600 rounded-full animate-spin"></div>
              </div>
              <h2>Loading...</h2>
            </div>
          ) : (
            <div>
              <div className="bg-gray-100 flex justify-evenly h-16">
                <div className="w-64 rounded-t-lg bg-green-600 ">
                  <span className="flex justify-center items-center p-4 text-white text-bold text-xl">
                    Departments
                  </span>
                </div>
                <div className="flex text-gray-400 flex-1 justify-end items-center space-x-4 pr-24">
                  <div>
                    <span className="text-green-500">
                      {data?.departments?.totalCount}
                    </span>{' '}
                    Items
                  </div>
                  <div>Sorted By</div>
                  <div>|</div>
                  <div className="flex justify-center items-center">
                    <span className="text-black font-semibold  flex  -space-x-4">
                      Recently Added{' '}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <table className="w-full p-10 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Department ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Department Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Employees Name
                    </th>

                    <th scope="col" className="px-6 py-3">
                      <span className="">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>{DisplayData}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {showCreate && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="bg-gray-500 flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-lg  h-full max-h-6xl ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
              >
                <svg
                  onClick={() => toggleCreate()}
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Create New Department{' '}
                </h3>
                <div className="flex space-x-10 justify-around items-center">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => CreateDepartment(e)}
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Department Name
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Name"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showUpdate && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="bg-gray-500 flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-lg  h-full max-h-6xl ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
              >
                <svg
                  onClick={() => toggleUpdate()}
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Update Department{' '}
                </h3>
                <div className="flex space-x-10 justify-around items-center">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => updateDepartment(e)}
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Department Name
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Name"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {success ? (
        <div
          id="popup-modal"
          className="grid  place-items-center h-screen overflow-y-auto overflow-x-hidden fixed  z-50 md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure?
                </h3>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  onClick={(e) => {
                    deleteDepartment(e);
                    toggleSuccess();
                  }}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  onClick={(e) => {
                    toggleSuccess();
                  }}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Departments;
