import React from 'react';
import { useContext } from 'react';
import { Job } from './Job.jsx';
import { useAllJobsContext } from '../pages/AllJobs.jsx';
import Wrapper from '../assets/wrappers/JobsContainer.js';

const JobsContainer = () => {

    const {data} = useAllJobsContext();
    const {jobs} = data;


    if(jobs.length === 0){
        return(
            <h2>No jobs do display...</h2>
        )
    }

    return(
        <Wrapper>
        <div className="jobs">
            {
                jobs.map((job) => {
                    return(
                        <Job key={job._id} {...job}></Job>
                    )
                })
            }
        </div>
        </Wrapper>
    )

}

export default JobsContainer;
