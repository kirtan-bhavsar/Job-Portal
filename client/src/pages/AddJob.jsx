import React from 'react'
import {useNavigation, useOutlet, useOutletContext} from 'react-router-dom';
import { Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import FormRow  from '../components/FormRow.jsx';
import JOB_STATUS from '../../../Utils/constants.js';
import JOB_TYPE from '../../../Utils/constants.js';

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
      <div className="form-row">

      </div>
      <button type='submit' className='btn btn-block form-btn'>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      </div>
    </Form>
  </Wrapper>)
}

export default AddJob