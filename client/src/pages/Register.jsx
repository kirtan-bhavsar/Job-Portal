import React from 'react'
import { Form, Link, useNavigation, redirect} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import {Logo,FormRow, SubmitBtn} from '../components';
import {customFetch} from '../utils/customFetch.js';
import {toast} from 'react-toastify';


export const action = async({request}) => {
 const formData = await request.formData();
 const data = Object.fromEntries(formData);
  try {
   await customFetch.post('/auth/register',data);
   toast.success('Registration successful !') 
   return redirect('/login');
 } catch (error) {
   toast.error(error?.response?.data?.message);
   // console.log(error);
   return error;
 }
}


const Register = () => {

 return (
   <Wrapper>
     <Form method='post' className='form'>
       <Logo></Logo>
       <FormRow type='text' name='name'></FormRow>       
       <FormRow type='text' name='lastName' labelText='Last Name' ></FormRow>       
       <FormRow type='text' name='location'></FormRow>       
       <FormRow type='email' name='email'></FormRow>       
       <FormRow type='password' name='password' ></FormRow>       
       <SubmitBtn></SubmitBtn>
       <p>Already a member? <Link to='/login' className='member-btn'>Login</Link></p>
     </Form>
   </Wrapper>
 )
}


export default Register;