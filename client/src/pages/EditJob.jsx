import React from 'react';
import { redirect, useLoaderData, useNavigation, useParams } from 'react-router-dom';
import { customFetch } from '../utils/customFetch';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { Form } from 'react-router-dom';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS,JOB_TYPE } from '../../../Utils/constants';

export const loader = async({params}) => {
  const {id} = params;
  try {
    const {data} = await customFetch.get(`/jobs/${id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = async({request,params}) => {
  
  const formData = await request.formData(); 
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.put(`/jobs/edit/${params.id}`,data);
    toast.success('Job Edited Successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    return toast.error(error?.response?.data?.message); 
    }

}

const EditJob = () => {

  const data = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

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
      <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>{isSubmitting ? "Submitting..." : 'Submit'}</button>
      </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob;