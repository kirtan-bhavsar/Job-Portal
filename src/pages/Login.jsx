import React from 'react';
import { Form, Link } from 'react-router-dom';
import {Logo,FormRow} from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo></Logo>
        <h4>Login</h4>
        <FormRow name='email' type='email' defaultValue='kirtan.bhavsar@gmail.com'></FormRow>
        <FormRow name='password' type='password' defaultValue='Abc123'></FormRow>
        <button type='submit' className='btn btn-block'>Submit</button>
        <button type='button' className='btn btn-block'>Explore The App</button>
        <p>Not a member yet? <Link to='/register' className='member-btn'>Register</Link></p>
      </form>
    </Wrapper>
  )
}

export default Login;