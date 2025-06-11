import React, { createContext,useContext } from 'react'
import { Outlet,redirect, useLoaderData, useNavigate, useNavigation  } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard.js';
import { SmallSidebar,BigSidebar,Navbar } from '../components';
import { useState } from 'react';
import { checkDefaultTheme } from '../App.jsx';
import { customFetch } from '../utils/customFetch.js';
import {toast} from 'react-toastify';

export const loader = async() => {
  try {
    const {data} = await customFetch.get('/user/current-user');
    // console.log(data);  
    return data;
  } catch (error) {
    console.log(error);
    return redirect('/');
  }
}


const DashboardContext = createContext();


const DashboardLayout = () => {

  const data = useLoaderData();
  console.log(data);  

 // temp
 const user = data;
const navigate = useNavigate();
 const [isDarkTheme,setIsDarkTheme] = useState(checkDefaultTheme());
 const [showSidebar,setShowSidebar] = useState(false);


 const logout = async() => {
    navigate('/');
    await customFetch.post('/auth/logout');
    toast.success('Logging out...');
 }


 const toggleSidebar = () => {
   console.log("Sidebar toggled");
   setShowSidebar(!showSidebar);
   console.log(showSidebar + " from DashboardLayout.jsx");
}


 const toggleDarkTheme = () => {
   const newDarkTheme = !isDarkTheme;
   setIsDarkTheme(newDarkTheme);
   document.body.classList.toggle('dark-theme',newDarkTheme);
   localStorage.setItem('darkTheme',newDarkTheme);
 }



 return (
   <DashboardContext.Provider value={{
     user,
     logout,
     showSidebar,
     toggleSidebar,
     isDarkTheme,
     toggleDarkTheme,
       }}>
   <Wrapper>
     <main className="dashboard">
       <SmallSidebar/>
       <BigSidebar/>
       <div>
         <Navbar></Navbar>
         <div className="dashboard-page">
           <Outlet context={{user}}/>
         </div>
       </div>
     </main>
   </Wrapper>
   </DashboardContext.Provider>
 )
}


export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout