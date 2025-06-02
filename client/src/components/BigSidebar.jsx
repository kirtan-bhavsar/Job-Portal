import React from 'react';
import Wrapper from '../assets/wrappers/BigSidebar.js';
import Logo from '../components/Logo.jsx';
// import { useDashboardContext } from '../pages/DashboardLayout.jsx';
import { useDashboardContext } from '../pages/DashboardLayout.jsx';
import NavLinks from './NavLinks.jsx';

const BigSidebar = () => {

    const {showSidebar,user,toggleSidebar} = useDashboardContext(); 
    return(
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className="content">
                    <header>
                    <Logo/>
                </header>
                    <NavLinks isBigSidebar></NavLinks>
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar;