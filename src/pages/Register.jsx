import React from 'react'
import { Link} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import {Logo,FormRow} from '../components';

const Register = () => {
  return (
    <Wrapper>
      <form action="" className='form'>
        <Logo></Logo>
        <FormRow type='text' name='name' defaultValue="kirtan" ></FormRow>        
        <FormRow type='text' name='lastName' defaultValue="bhavsar" labelText='Last Name' ></FormRow>        
        <FormRow type='text' name='location' defaultValue="Vadodara" ></FormRow>        
        <FormRow type='email' name='email' defaultValue="kirtan.bhavsar@gmail.com" ></FormRow>        
        <FormRow type='password' name='password' defaultValue="Abc123" ></FormRow>        
        <button type='submit' className='btn btn-block'>Submit</button>
        <p>Already a member? <Link to='/login' className='member-btn'>Login</Link></p>
      </form>
    </Wrapper>
  )
}

export default Register;