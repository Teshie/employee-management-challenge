import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { DEPARTMENTS, EMPLOYEES } from '../Components/Queries';
import { client } from '../main';

const Employee = () => {
  const { loading: loading, error: error, data: data } = useQuery(DEPARTMENTS);
  const { loading: load, error: err, data: dat } = useQuery(EMPLOYEES);
  const [showCreate, setShowCreate] = useState<Boolean>(false);
  const [name, setName] = useState<string>('');
  const [showUpdate, setShowUpdate] = useState<Boolean>(false);
  const [depId, setDepId] = useState<string>('1');
  const [success, setSuccess] = useState<Boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const toggleSuccess = () => setSuccess(!success);
  const toggleCreate = () => setShowCreate(!showCreate);
  const toggleUpdate = () => setShowUpdate(!showUpdate);

  const [empId, setEmpId] = useState<number>();
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [subCity, setSubCity] = useState<string>('');
  const [woreda, setWoreda] = useState<string>('');
  const [zone, setZone] = useState<string>('');
  const [kebele, setKebele] = useState<string>('');
  const [houseNo, setHouseNo] = useState<string>('');

  ///

  const CreateEmployee = (e: any) => {
    e.preventDefault();
    client
      .mutate({
        mutation: gql`
          mutation {
            createEmployee(
              input: {
                firstName: "${name}"
                lastName: "${lastName}"
                gender: "${gender}"
                phoneNo: "${phoneNo}"
                email: "${email}"
                dateOfBirth: "2019-10-12T07:20:50.52Z"
                country: "${country}"
                region: "${region}"
                city: "${city}"
                subCity: "${subCity}"
                woreda: "${woreda}"
                zone: "${zone}"
                kebele: "${kebele}"
                houseNo: "${houseNo}"
                departmentId: ${depId}
              }
            ) {
              departmentId
              firstName
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
  console.log(dat, 'dat');
  const updateEmployee = (e: any) => {
    e.preventDefault();
    client
      .mutate({
        mutation: gql`
        mutation {
          updateEmployee(
            input: {
              id: ${empId}
              firstName: "${name}"
              lastName: "${lastName}"
              gender: "${gender}"
              phoneNo: "${phoneNo}"
              email: "${email}"
              dateOfBirth: "2019-10-12T07:20:50.52Z"
              country: "${country}"
              region: "${region}"
              city: "${city}"
              subCity: "${subCity}"
              woreda: "${woreda}"
              zone: "${zone}"
              kebele: "${kebele}"
              houseNo: "${houseNo}"
              departmentId: ${depId}
            }
          ) {
            departmentId
            firstName
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
  const deleteEmployee = (e: any) => {
    e.preventDefault();
    client
      .mutate({
        mutation: gql`
          mutation {
            deleteEmployee( id: ${empId} ) {
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
  const DisplayData = dat?.employees?.edges
    ?.filter((row: any) =>
      row?.node?.firstName?.match(new RegExp(searchValue, 'i'))
    )
    .map((items: any) => {
      return (
        <tr
          key={items?.node?.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td className="px-6 py-4">{items?.node?.id}</td>
          <td className="px-6 py-4">{items?.node?.departmentId}</td>
          <td className="px-6 py-4">
            {items?.node?.firstName
              ? items?.node?.firstName
              : items?.node?.lastName}
          </td>
          <td className="px-6 py-4">{items?.node?.city}</td>
          <td className="px-6 py-4">{items?.node?.subCity}</td>
          <td className="px-6 py-4">{items?.node?.gender}</td>

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
                  setEmpId(items?.node?.id);
                  setDepId(items?.node?.departmentId);
                  setName(items?.node?.firstName);
                  setLastName(items?.node?.lastName);
                  setGender(items?.node?.gender);
                  setPhoneNo(items?.node?.phoneNo);
                  setEmail(items?.node?.email);
                  setDateOfBirth(items?.node?.dateOfBirth);
                  setCountry(items?.node?.country);
                  setRegion(items?.node?.region);
                  setCity(items?.node?.city);
                  setSubCity(items?.node?.subCity);
                  setWoreda(items?.node?.woreda);
                  setZone(items?.node?.zone);
                  setKebele(items?.node?.kebele);
                  setHouseNo(items?.node?.houseNo);

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
                  setEmpId(items?.node?.id);
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
            <p className="text-red-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-blue-500"
                onClick={() => {
                  setEmpId(items?.node?.id);
                  setDepId(items?.node?.departmentId);
                  setName(items?.node?.firstName);
                  setLastName(items?.node?.lastName);
                  setGender(items?.node?.gender);
                  setPhoneNo(items?.node?.phoneNo);
                  setEmail(items?.node?.email);
                  setDateOfBirth(items?.node?.dateOfBirth);
                  setCountry(items?.node?.country);
                  setRegion(items?.node?.region);
                  setCity(items?.node?.city);
                  setSubCity(items?.node?.subCity);
                  setWoreda(items?.node?.woreda);
                  setZone(items?.node?.zone);
                  setKebele(items?.node?.kebele);
                  setHouseNo(items?.node?.houseNo);
                  toggleUpdate();
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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
              Add Employee
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
                    Employees
                  </span>
                </div>
                <div className="flex text-gray-400 flex-1 justify-end items-center space-x-4 pr-24">
                  <div>
                    <span className="text-green-500">
                      {dat?.employees?.totalCount}
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
                      Employee ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Department ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Sub City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gender
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
          <div className="relative p-4 w-full max-w-5xl  h-full max-h-6xl ">
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
                  Create New Employee{' '}
                </h3>
                <div className="flex space-x-10 justify-around items-center">
                  <form
                    className="space-y-6 grid grid-cols-3 gap-4 text-black"
                    onSubmit={(e) => CreateEmployee(e)}
                  >
                    <div>
                      <p className="text-xs p-2">First Name</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="First Name"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Last Name</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Last Name"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Gender</p>
                      <div className="flex items-center space-x-2">
                        <select
                          name="description"
                          id="desc"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Gender"
                          required
                        >
                          <option value="male">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>

                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Phone</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Phone"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Email</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Email"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Date of Birth</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="date"
                          name="description"
                          id="desc"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Country</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Country"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Region</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Region"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose City</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter City"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose SubCity</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={subCity}
                          onChange={(e) => setSubCity(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter SubCity"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Woreda</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={woreda}
                          onChange={(e) => setWoreda(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Woreda"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Zone</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={zone}
                          onChange={(e) => setZone(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Zone"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Kebele</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={kebele}
                          onChange={(e) => setKebele(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Kebele"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose House No.</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={houseNo}
                          onChange={(e) => setHouseNo(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter House No.."
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-xs p-2">Choose Department</p>
                      <div className="flex items-center space-x-2">
                        <select
                          value={depId}
                          onChange={(e) => {
                            setDepId(e.target.value);
                          }}
                          id="countries"
                          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {data?.departments?.edges?.map((items: any) => {
                            return (
                              <option value={items?.node?.id}>
                                {items?.node?.name}
                              </option>
                            );
                          })}
                        </select>
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
          <div className="relative p-4 w-full max-w-5xl  h-full max-h-6xl ">
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
                  Update Employee{' '}
                </h3>
                <div className="flex space-x-10 justify-around items-center">
                  <form
                    className="space-y-6 grid grid-cols-3 gap-4 text-black"
                    onSubmit={(e) => updateEmployee(e)}
                  >
                    <div>
                      <p className="text-xs p-2">First Name</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="First Name"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Last Name</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Last Name"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Gender</p>
                      <div className="flex items-center space-x-2">
                        <select
                          name="description"
                          id="desc"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Gender"
                          required
                        >
                          <option value="male">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>

                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Phone</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Phone"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Email</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Email"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Date of Birth</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="date"
                          name="description"
                          id="desc"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Country</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Country"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Region</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Region"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose City</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter City"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose SubCity</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={subCity}
                          onChange={(e) => setSubCity(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter SubCity"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Woreda</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={woreda}
                          onChange={(e) => setWoreda(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Woreda"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Zone</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={zone}
                          onChange={(e) => setZone(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Zone"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose Kebele</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={kebele}
                          onChange={(e) => setKebele(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter Kebele"
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs p-2">Choose House No.</p>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="description"
                          id="desc"
                          value={houseNo}
                          onChange={(e) => setHouseNo(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                          placeholder="Enter House No.."
                          required
                        />
                        <p className="text-red-500">*</p>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-xs p-2">Choose Department</p>
                      <div className="flex items-center space-x-2">
                        <select
                          value={depId}
                          onChange={(e) => {
                            setDepId(e.target.value);
                          }}
                          id="countries"
                          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {data?.departments?.edges?.map((items: any) => {
                            return (
                              <option value={items?.node?.id}>
                                {items?.node?.name}
                              </option>
                            );
                          })}
                        </select>
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
                    deleteEmployee(e);
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

export default Employee;
