import React from 'react'
import { Form, Link, useNavigation, redirect} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import {Logo,FormRow} from '../components';
import {customFetch} from '../utils/customFetch.js';

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    await customFetch.post('/auth/register',data);
    return redirect('/login');
  } catch (error) {
    console.log(error);
    return error;
  }

}

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo></Logo>
        <FormRow type='text' name='name' defaultValue="kirtan" ></FormRow>        
        <FormRow type='text' name='lastName' defaultValue="bhavsar" labelText='Last Name' ></FormRow>        
        <FormRow type='text' name='location' defaultValue="Vadodara" ></FormRow>        
        <FormRow type='email' name='email' defaultValue="kirtan.bhavsar@gmail.com" ></FormRow>        
        <FormRow type='password' name='password' defaultValue="Abc123" ></FormRow>        
        <button type='submit' className='btn btn-block'>Submit</button>
        <p>Already a member? <Link to='/login' className='member-btn'>Login</Link></p>
      </Form>
    </Wrapper>
  )
}

export default Register;