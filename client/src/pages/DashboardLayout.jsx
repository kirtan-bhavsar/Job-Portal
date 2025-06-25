import React, { createContext, useContext } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard.js';
import { SmallSidebar, BigSidebar, Navbar, Loading } from '../components';
import { useState } from 'react';
import { checkDefaultTheme } from '../App.jsx';
import { customFetch } from '../utils/customFetch.js';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// userQuery starts
const userQuery = {
  queryKey : ['user'],
  queryFn : async() => {
    const {data} = await customFetch.get('/user/current-user');
    // console.log(data);
    // console.log('the above is form userQuery');
    return data;
  }
}
// userQueryEnds

export const loader = (queryClient) => async () => {
  try {

    // loader ensure query starts
    return await queryClient.ensureQueryData(userQuery);
    // loader ensure query ends


    const { data } = await customFetch.get('/user/current-user');
    // console.log(data);  
    return data;
  } catch (error) {
    console.log(error);
    return redirect('/');
  }
}


const DashboardContext = createContext();


const DashboardLayout = ({queryClient}) => {

  // data fetching through useQuery Starts
  const {data} = useQuery(userQuery);
  // console.log(data);
  // console.log('the above is from useQuery in layout');
  // console.log(trialData);
  // console.log('the above is from fetching trial Data');
  // data fetching through useQuery Ends

  // const data = useLoaderData();
  // hardcoded data
  // const data = {user:kirtan};
  // console.log(data);  

  // temp
  const user = data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [isAuthError,setIsAuthError] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [showSidebar, setShowSidebar] = useState(false);


  const logout = async () => {
    navigate('/');
    await customFetch.post('/auth/logout');
    queryClient.invalidateQueries();
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
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  }

  customFetch.interceptors.response.use((response) =>{
    return response;
  },(error) => {
    if(error?.response?.status === 401){
      setIsAuthError(true);
    }
    return Promise.reject(error);
    // so the above line of code is just telling the subsequent code that there is an error and 
    // will also invoke catch
  });

  useEffect(() => {
    if(!isAuthError) return;
    logout();
  },[isAuthError])

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
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar></Navbar>
            <div className="dashboard-page">
              {isPageLoading ? <Loading></Loading> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}


export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout