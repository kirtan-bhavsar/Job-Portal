import React from 'react'
import {useNavigation, useOutlet, useOutletContext} from 'react-router-dom';
import { Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import FormRow  from '../components/FormRow.jsx';
import FormRowSelect from '../components/FormRowSelect.jsx';
import {JOB_STATUS,JOB_TYPE} from '../../../Utils/constants.js';

const AddJob = () => {

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const {user} = useOutletContext();


  return (<Wrapper>
    <Form method='post' className='form'>
      <h4 className="form-title">add job</h4>
      <div className="form-center">
      <FormRow type='text' name='position'></FormRow>
      <FormRow type='text' name='company'></FormRow>
      <FormRow type='text' name='jobLocation' labelText='job location' defaultValue={user.location} disabled={isSubmitting}></FormRow>
      <FormRowSelect name='jobStatus' labelText='job location' defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}></FormRowSelect>
      <FormRowSelect name='jobType' labelText='job type' defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)}></FormRowSelect>
      <button type='submit' className='btn btn-block form-btn'>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      </div>
    </Form>
  </Wrapper>)
}

export default AddJob