import React from 'react';
import Wrapper from '../assets/wrappers/LogoutContainer.js';
import {FaUserCircle,FaCaretDown} from 'react-icons/fa'
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout.jsx';

const LogoutContainer = () => {

    const [showLogout,setShowLogout] = useState(false);

    const {logout,user} = useDashboardContext();

    return(
    <Wrapper>
        <button type='button' className='btn logout-btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle/>
            {user?.name}
            <FaCaretDown/>
        </button>
        <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logout}>Logout</button>
        </div>
    </Wrapper>
    )
}

export default LogoutContainer;