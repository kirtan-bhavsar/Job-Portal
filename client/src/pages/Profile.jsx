import React from 'react'
import {customFetch} from '../utils/customFetch.js';
import { Form,redirect,useNavigation, useOutletContext } from 'react-router-dom';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import FormRow from '../components/FormRow.jsx';
import {toast} from 'react-toastify';
import SubmitBtn from './../components/SubmitBtn';

export const action = async({request}) => {

  const formData = await request.formData();
  const file = formData.get('avatar');

  if(file && file.size > 500000){
    return toast.error("Image size too large !");
    return null;
  }

  try {
    const response = await customFetch.post('/user/update',formData);
    toast.success('User updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }

  return redirect('/dashboard');

}

const Profile = () => {

  const {user} = useOutletContext();
  const {name,email,location,lastName} = user;

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
        <SubmitBtn FormButton></SubmitBtn>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile