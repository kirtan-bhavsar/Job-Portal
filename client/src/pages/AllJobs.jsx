import React from 'react'
import {SearchContainer}  from '../components'
import {JobsContainer} from '../components'
import { customFetch } from '../utils/customFetch'
import { createContext,useContext } from 'react'
import { useLoaderData } from 'react-router-dom'

export const loader = async() => {
  try {
    const {data} = await customFetch.get('/jobs');
    return {data};
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
}

const AllJobsContext = createContext();

const AllJobs = () => {

  const {data} = useLoaderData();

  return (
    <AllJobsContext.Provider value={{data}}>
    <SearchContainer></SearchContainer>
    <JobsContainer></JobsContainer>
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs