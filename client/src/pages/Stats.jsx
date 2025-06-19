import React from 'react'
import { customFetch } from '../utils/customFetch';
import { StatsContainer, ChartsContainer } from '../components';
import { useLoaderData } from 'react-router-dom';


export const loader = async() => {


 try {
  
   const response = await customFetch.get('/jobs/stats');
   return response.data;


 } catch (error) {
   return error;
 }


}


const Stats = () => {




 const {jobStats,monthlyJobStats:data} = useLoaderData();
 console.log(jobStats);
 console.log(data);


 return (


 <>
   <StatsContainer jobStats={jobStats}></StatsContainer>
   {data?.length > 1 && <ChartsContainer data={data}></ChartsContainer>}
   </>
 )
}


export default Stats;
