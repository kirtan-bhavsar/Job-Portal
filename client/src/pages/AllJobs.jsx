import React from 'react'
import {SearchContainer}  from '../components'
import {JobsContainer} from '../components'
import { customFetch } from '../utils/customFetch'
import { createContext,useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'


export const loader = async({request}) => {
  // console.log(request.url);
  // console.log(new URL(request.url));
  // console.log(new URL(request.url).searchParams.entries());
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());
  // console.log(params);
  // console.log('the above is params');
  try {
    const {data} = await customFetch.get('/jobs',{params});
    return {data,searchValues:params};
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
}

const AllJobsContext = createContext();

const AllJobs = () => {

  const {data,searchValues} = useLoaderData();

  return (
    <AllJobsContext.Provider value={{data,searchValues}}>
    <SearchContainer></SearchContainer>
    <JobsContainer></JobsContainer>
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs