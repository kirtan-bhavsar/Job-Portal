import React from 'react'
import { customFetch } from '../utils/customFetch';
import { StatsContainer, ChartsContainer } from '../components';
import { useLoaderData } from 'react-router-dom';
import {QueryClient, useQuery} from '@tanstack/react-query';

const statsQuery = {
    queryKey:['stats'],
    queryFn : async() => {
      const response = await customFetch.get('/jobs/stats');
      return response.data;
    },
  }


export const loader = (queryClient) => async() => {
const data = queryClient.ensureQueryData(statsQuery);
// here using the ensureQueryData, we are just ensuring that data is actually available in the system
// as the data loaded here has no significance, because we are not using useLoaderData(), instead we 
// are using useQuery, to fetch the data, and it it gets stale, then new data will be loaded.

// if the ensureQueryData, does not find the data, then it will get the new data from statsQuery and will fill the 
// cache accordingly
return data;
}


const Stats = () => {
  let {data:responseData} = useQuery(statsQuery);
  const {jobStats,monthlyJobStats:data} = responseData;

 return (


 <>
   <StatsContainer jobStats={jobStats}></StatsContainer>
   {data?.length > 1 && <ChartsContainer data={data}></ChartsContainer>}
   </>
 )
}


export default Stats;
