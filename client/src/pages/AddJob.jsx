import React from 'react'
import {useNavigation, useOutlet, useOutletContext, redirect} from 'react-router-dom';
import { Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import FormRow  from '../components/FormRow.jsx';
import FormRowSelect from '../components/FormRowSelect.jsx';
import {JOB_STATUS,JOB_TYPE} from '../../../Utils/constants.js';
import { customFetch } from '../utils/customFetch.js';
import {toast} from 'react-toastify';
import {SubmitBtn} from '../components'
// import SubmitBtn from './../components/SubmitBtn';


export const action = async({request}) => {
  const formData = await request.formData();
 const data = Object.fromEntries(formData);




 try {
   await customFetch.post('/jobs/add',data);
   toast.success("Job added successfully");
   return redirect('/dashboard/all-jobs')
 } catch (error) {
   toast.error(error?.response?.data?.message);
   return error;
 }


}


const AddJob = () => {


 const {user} = useOutletContext();




 return (<Wrapper>
   <Form method='post' className='form'>
     <h4 className="form-title">add job</h4>
     <div className="form-center">
     <FormRow type='text' name='position'></FormRow>
     <FormRow type='text' name='company'></FormRow>
     <FormRow type='text' name='location' labelText='job location' defaultValue={user.location}></FormRow>
     <FormRowSelect name='jobStatus' labelText='job status' defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}></FormRowSelect>
     <FormRowSelect name='jobType' labelText='job type' defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)}></FormRowSelect>
     <SubmitBtn FormButton></SubmitBtn>
     </div>
   </Form>
 </Wrapper>)
}


export default AddJob
