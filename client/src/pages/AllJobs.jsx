import React from 'react'
import {SearchContainer}  from '../components'
import {JobsContainer} from '../components'
import { customFetch } from '../utils/customFetch'
import { createContext,useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

// allJobsQuery starts
const allJobsQuery = (params) => {

  const {search,jobType,jobStatus,sort,count,page} = params;

  return{
    queryKey : ['jobs',search ?? '', jobType ?? 'all', jobStatus ?? 'all', sort ?? 'newest', page ?? '1'],
    queryFn : async() => {
      const {data} = await customFetch.get('/jobs',{params});
      console.log(data);
      console.log('this is from allJobsQuery');
      return data;
    }
  }
}
// allJobsQuery ends


export const loader = (queryClient) => async({request}) => {

  const params = Object.fromEntries(new URL(request.url).searchParams.entries());

  await queryClient.ensureQueryData(allJobsQuery(params));

    return {searchValues:params};
}

const AllJobsContext = createContext();

const AllJobs = () => {

  const {searchValues:params} = useLoaderData();

    // calling data in componenet starts
  const {data} = useQuery(allJobsQuery(params));
  // console.log(trialData);
  // console.log("this is from all jobs react component");
  // calling data in componenet ends

  return (
    <AllJobsContext.Provider value={{data,searchValues:params}}>
    <SearchContainer></SearchContainer>
    <JobsContainer></JobsContainer>
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs