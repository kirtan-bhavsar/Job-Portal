import React from 'react'
import { Form, Link, useNavigation, redirect} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import {Logo,FormRow} from '../components';
import {customFetch} from '../utils/customFetch.js';
import {toast} from 'react-toastify';


export const action = async({request}) => {
 const formData = await request.formData();
 const data = Object.fromEntries(formData);
  try {
   await customFetch.post('/auth/register',data);
   toast.error('Registration successful !') 
   return redirect('/login');
 } catch (error) {
   toast.error(error?.response?.data?.message);
   // console.log(error);
   return error;
 }
}


const Register = () => {


 const navigation = useNavigation();
 const isSubmitting = navigation.state === 'submitting';


 return (
   <Wrapper>
     <Form method='post' className='form'>
       <Logo></Logo>
       <FormRow type='text' name='name' defaultValue="kirtan" ></FormRow>       
       <FormRow type='text' name='lastName' defaultValue="bhavsar" labelText='Last Name' ></FormRow>       
       <FormRow type='text' name='location' defaultValue="Vadodara" ></FormRow>       
       <FormRow type='email' name='email' defaultValue="kirtan.bhavsar@gmail.com" ></FormRow>       
       <FormRow type='password' name='password' defaultValue="12345678" ></FormRow>       
       <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
       <p>Already a member? <Link to='/login' className='member-btn'>Login</Link></p>
     </Form>
   </Wrapper>
 )
}


export default Register;