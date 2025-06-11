import React from 'react';
import { Form, Link, useNavigation, redirect,useActionData } from 'react-router-dom';
import {Logo,FormRow} from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import {toast} from 'react-toastify';
import { customFetch } from '../utils/customFetch.js';


export const action = async({request}) => {
  const formData = await request.formData();
 const data = Object.fromEntries(formData);

//  const errors = {msg:""};

//  if(data.password.length < 3){
//   errors.msg = "Password too short";
//   return errors;
//  }

 try {
   await customFetch.post('/auth/login',data);
   toast.success('Login Successful');
   return redirect('/dashboard');
 } catch (error) {
   toast.error(error.response.data.message);
   return error;
  // errors.msg = error?.response?.data?.message;
  //  return errors;
 }


}


const Login = () => {

  // const errors = useActionData();

 const navigation = useNavigation();
 const isSubmitting = navigation.state === 'submitting';


 return (

   <Wrapper>
     <Form method='post' className='form'>
       <Logo></Logo>
       <h4>Login</h4>
       {/* {errors?.msg && <p style={{color:'red'}}>{errors.msg}</p>} */}
       {/* <p></p> */}
       <FormRow name='email' type='email' defaultValue='kirtan.bhavsar@gmail.com'></FormRow>
       <FormRow name='password' type='password' defaultValue='Abc123'></FormRow>
       <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
       <button type='button' className='btn btn-block'>Explore The App</button>
       <p>Not a member yet? <Link to='/register' className='member-btn'>Register</Link></p>
     </Form>
   </Wrapper>
 )
}


export default Login;
