import React from 'react';
import { redirect, useLoaderData, useNavigation, useParams } from 'react-router-dom';
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { Form } from 'react-router-dom';
import { FormRow, FormRowSelect,SubmitBtn } from '../components';
import { JOB_STATUS,JOB_TYPE } from '../../../Utils/constants';
import { useQuery } from '@tanstack/react-query';
// import {SubmitBtn} from '../components';

const editJobQuery = (id) => {
  return {
  queryKey:['edit',id],
  queryFn : async() => {
    const {data} = await customFetch.get(`/jobs/${id}`);
    return data;
  }
  }
}

export const loader = (queryClient) => async({params}) => {
  // const {id} = params;
  // params.id worked as we are ensuring to mount the component only when there is valid id.

  try {
  await queryClient.ensureQueryData(editJobQuery(params.id));
  // const {id} = params;
  return params.id;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = (queryClient) => async({request,params}) => {
  
  const formData = await request.formData(); 
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.put(`/jobs/edit/${params.id}`,data);
    queryClient.invalidateQueries(['jobs']);
    toast.success('Job Edited Successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    return toast.error(error?.response?.data?.message); 
    }

}

const EditJob = () => {

  const id = useLoaderData();

  const {data} = useQuery(editJobQuery(id))
  console.log(data);
  console.log('this is the data from component');

  // const data = useLoaderData();

  return (
    <Wrapper>
      <Form method='post' className='form'>
      <h4 className="form-title">Edit Job</h4>
      <div className="form-center">
      <FormRow name='position' type='text' defaultValue={data.position}></FormRow>
      <FormRow name='company' type='text' defaultValue={data.company}></FormRow>
      <FormRow name='location' type='text' defaultValue={data.location} labelText='job location'></FormRow>
      <FormRowSelect name='jobStatus' list={JOB_STATUS} defaultValue={data.jobStatus} labelText='job status'></FormRowSelect>
      <FormRowSelect name='jobType' list={JOB_TYPE} defaultValue={data.jobType} labelText='job type'></FormRowSelect>
      <SubmitBtn FormButton></SubmitBtn>
      </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob;