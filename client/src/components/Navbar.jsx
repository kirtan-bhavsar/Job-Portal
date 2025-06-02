import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/Navbar.js';
import {FaHome,FaAlignLeft} from 'react-icons/fa';
import Logo from './Logo.jsx';
import { useDashboardContext } from '../pages/DashboardLayout.jsx';
import LogoutContainer from './LogoutContainer.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const Navbar = () => {
  const {toggleSidebar} = useDashboardContext();
  return (
    <Wrapper>
        <div className="nav-center">
          <button type='button' className='toggle-btn' onClick={toggleSidebar}>
            <FaAlignLeft></FaAlignLeft>
          </button>
        <div>
          <Logo/>
          <h4 className='logo-text'>Dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle/>
          <LogoutContainer/>
          </div>
</div>
    </Wrapper>
  )
}

export default Navbar