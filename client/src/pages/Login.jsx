import React from 'react';
import { Form, Link, useNavigation, redirect,useActionData,useNavigate } from 'react-router-dom';
import {Logo,FormRow, SubmitBtn} from '../components';
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


 const navigation = useNavigation();
 const isSubmitting = navigation.state === 'submitting';
 const navigate = useNavigate();

 const loginDemoUser = async() => {

  const data = {
    email:"cedric.diggory@gmail.com",
    password:"12345678"
  };

  try {
    await customFetch.post('/auth/login',data);
    toast.success("Welcome to your test drive !!");
    return navigate('/dashboard'); 
  } catch (error) {
    toast.error(error?.resposne?.data?.message);
    return error;
  }

 }


 return (

   <Wrapper>
     <Form method='post' className='form'>
       <Logo></Logo>
       <h4>Login</h4>
       {/* {errors?.msg && <p style={{color:'red'}}>{errors.msg}</p>} */}
       {/* <p></p> */}
       <FormRow name='email' type='email' defaultValue='kirtan.bhavsar@gmail.com'></FormRow>
       <FormRow name='password' type='password' defaultValue='Abc123'></FormRow>
       <SubmitBtn></SubmitBtn>
       <button type='button' className='btn btn-block' onClick={loginDemoUser}>Explore The App</button>
       <p>Not a member yet? <Link to='/register' className='member-btn'>Register</Link></p>
     </Form>
   </Wrapper>
 )
}


export default Login;
