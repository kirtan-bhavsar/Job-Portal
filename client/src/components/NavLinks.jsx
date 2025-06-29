import React from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const NavLinks = ({isBigSidebar}) => {

    const {toggleSidebar,user} = useDashboardContext(); 

    return(
        <div className="nav-links">
                        {links.map((link) => {
                            const {text,path,icon} = link;
                            const {role} = user;
                            if(path === 'admin' && role !== 'admin') return;
                            return(
                                <NavLink className='nav-link' onClick={isBigSidebar ? null : toggleSidebar} to={path} key={text} end>
                                    <span className='icon'>{icon}</span>
                                    {text}
                                </NavLink>
                            )
                        })}
                    </div>
    )
}

export default NavLinks