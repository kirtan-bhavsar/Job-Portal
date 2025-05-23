import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar.js';
import { useDashboardContext } from '../pages/DashboardLayout.jsx';
import {FaTimes} from 'react-icons/fa';
import Logo from './Logo.jsx';
import links from '../utils/links.jsx';
import { NavLink } from 'react-router-dom';

const SmallSidebar = () => {
    const {showSidebar,toggleSidebar} = useDashboardContext();
    // console.log(data);
    return(
        <Wrapper>
            <div className={showSidebar ? 'show-sidebar sidebar-container':'sidebar-container'}>
                <div className="content">
                    <button type='button' className='close-btn' onClick={toggleSidebar}>
                        <FaTimes/>
                    </button>
                    <header>
                        <Logo/>
                    </header>
                    <div className="nav-links">
                        {links.map((link) => {
                            const {text,path,icon} = link;
                            return(
                                <NavLink className='nav-link' onClick={toggleSidebar} to={path} key={text} end>
                                    <span className='icon'>{icon}</span>
                                    {text}
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSidebar;