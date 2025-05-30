import React from "react";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage.js";
import Logo from "../components/Logo.jsx";
import main from "../assets/images/main.svg";
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quo
            vero quisquam mollitia ad veritatis? Totam ex praesentium blanditiis
            laborum repellat natus cum. Quisquam esse nulla sed libero a sit.
          </p>
        <Link to='/register' className='btn register-link'>Register</Link>
        <Link to='/login' className='btn'>Login / Demo User</Link>
        </div>
        <img src={main} alt="Job Portal" className="img main-img"/>
      </div>
    </Wrapper>
  );
};

export default Landing;
