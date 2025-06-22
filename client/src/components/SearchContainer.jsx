import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import { Form, Link, useSubmit } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitBtn } from "./index.js";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../../../Utils/constants.js";
import { useAllJobsContext } from "../pages/AllJobs.jsx";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobType, jobStatus, sort } = searchValues;

  const debounce = (onChange) => {
    let timeout;
    return(e) => {
      clearTimeout(timeout);
      const form = e.currentTarget.form;
       timeout = setTimeout(() => {
        onChange(form);
       },2000)
    } 
  };

  const submit = useSubmit();
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow
            name="search"
            type="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          ></FormRow>
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={jobStatus}
            list={["all", ...Object.values(JOB_STATUS)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          ></FormRowSelect>
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={jobType}
            list={["all", ...Object.values(JOB_TYPE)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          ></FormRowSelect>
          <FormRowSelect
            name="sort"
            labelText="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          ></FormRowSelect>
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Value
          </Link>
          {/* <SubmitBtn FormButton></SubmitBtn> */}
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
