import React from 'react';
import { useContext } from 'react';
import { Job } from './Job.jsx';
import { useAllJobsContext } from '../pages/AllJobs.jsx';
import Wrapper from '../assets/wrappers/JobsContainer.js';
import PageBtnContainer from './PageBtnContainer.jsx';

const JobsContainer = () => {

    // const {data} = useAllJobsContext();
    // console.log(data);
    // const {jobs,totalJobs,currentPage,numberOfPages} = data;

    const{data:{jobs,totalJobs,currentPage,numberOfPages}} = useAllJobsContext();

    if(jobs.length === 0){
        return(
            <h2>No jobs do display...</h2>
        )
    }

    return(
        <Wrapper>
        <h5>{totalJobs} job{totalJobs > 1 && 's'} found</h5>
        <div className="jobs">
            {
                jobs.map((job) => {
                    return(
                        <Job key={job._id} {...job}></Job>
                    )
                })
            }
        </div>
        {numberOfPages>1 && <PageBtnContainer/>}
        </Wrapper>
    )

}

export default JobsContainer;
