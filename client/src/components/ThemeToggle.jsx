import React from 'react';
import {BsFillSunFill,BsFillMoonFill, BsMoonFill} from 'react-icons/bs';
import {useDashboardContext} from '../pages/DashboardLayout.jsx';
import Wrapper from '../assets/wrappers/ThemeToggle.js';

const ThemeToggle = () => {

    const {isDarkTheme,toggleDarkTheme} = useDashboardContext();

    return(
        <Wrapper onClick={toggleDarkTheme}>
            {
                isDarkTheme ? 
                <BsFillSunFill className='toggle-icon'/>: 
                <BsMoonFill className='toggle-icon'/>
            }
        </Wrapper>
    )
}

export default ThemeToggle;