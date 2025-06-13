import React from 'react'
import Wrapper from '../assets/wrappers/Job.js';
import JobInfo from './JobInfo.jsx';
import {FaLocationArrow,FaBriefcase,FaCalendarAlt} from 'react-icons/fa';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Link,Form } from 'react-router-dom';

export const Job = ({
  _id,
  company,
  position,
  jobStatus,
  jobType,
  createdAt,
  location,
}) => {

  const date = day(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
      <div className="main-icon">{company.charAt(0)}</div>
      <div className="info">
        <h5>{position}</h5>
        <p>{company}</p>
      </div>
      </header>
      <div className="content">
        <div className="content-center">
        <JobInfo icon={<FaLocationArrow></FaLocationArrow>} text={location}></JobInfo>
        <JobInfo icon={<FaCalendarAlt></FaCalendarAlt>} text={date}></JobInfo>
        <JobInfo icon={<FaBriefcase></FaBriefcase>} text={jobType}></JobInfo>
        <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
      </div>
      <footer className="actions">
        <Link to={`../edit-job/${_id}`} className='btn edit-btn'>Edit</Link>
        <Form method='post' action={`../delete-jobs/${_id}`}>
          <button type='submit' className="btn delete-btn">Delete</button>
        </Form>
      </footer>
    </Wrapper>
  )
}


