import React from 'react'
import {customFetch} from '../utils/customFetch.js';
import { Form,useNavigation, useOutletContext } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import FormRow from '../components/FormRow.jsx';

const Profile = () => {

  const {user} = useOutletContext();
  const {name,email,location,lastName} = user;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form className='form' method='post' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className='form-label'>Select an image file (max 0.5MB)</label>
            <input type="file" id='avatar' name='avatar' accept='image/*' className='form-input' />
          </div>
        <FormRow name='name' defaultValue={name} type='text'></FormRow>
        <FormRow name='lastName' defaultValue={lastName} type='text' labelText='last name'></FormRow>
        <FormRow name='email' defaultValue={email} type='email'></FormRow>
        <FormRow name='location' defaultValue={location} type='text'></FormRow>
        <button className='btn btn-block form-btn' type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...':"Submit"}</button>
                </div>
      </Form>
    </Wrapper>
  )
}

export default Profile