import React, { createContext,useContext } from 'react'
import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard.js';
import { SmallSidebar,BigSidebar,Navbar } from '../components';
import { useState } from 'react';
import { checkDefaultTheme } from '../App.jsx';


const DashboardContext = createContext();


const DashboardLayout = () => {

 // temp
 const user = {name:"kirtan"};
 const [isDarkTheme,setIsDarkTheme] = useState(checkDefaultTheme());
 const [showSidebar,setShowSidebar] = useState(false);


 const logout = async() => {
   console.log("User logged out");
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
           <Outlet/>
         </div>
       </div>
     </main>
   </Wrapper>
   </DashboardContext.Provider>
 )
}


export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout