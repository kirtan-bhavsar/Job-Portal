import React from 'react'
import { useAllJobsContext } from '../pages/AllJobs'

const PageBtnContainer = () => {
    
    // const {data} = useAllJobsContext();
    // const {numberOfPages,currentPage} = data;
    // console.log(numberOfPages,currentPage);

    // this above can be written simplay as this :
    const {data:{numberOfPages,currentPage}} = useAllJobsContext();
    console.log(numberOfPages,currentPage);

  return (
    <h1>PageBtnContainer</h1>
  )
}
export default PageBtnContainer