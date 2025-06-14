  import React from 'react'
  import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
  // import HomeLayout from './pages/HomeLayout.jsx';
  import {HomeLayout,Error,Landing,Register,Login,DashboardLayout,AddJob,Profile,Stats,Admin,AllJobs, EditJob} from './pages';
  import { createBrowserRouter,RouterProvider } from 'react-router-dom';
  import {action as registerAction } from './pages/Register.jsx';
  import {action as loginAction} from './pages/Login.jsx';
  import {loader as dashboardLoader} from './pages/DashboardLayout.jsx';
  import {action as addjobAction} from './pages/AddJob.jsx';
  import {loader as alljobsLoader} from './pages/AllJobs.jsx';
  import {loader as editJobLoader} from './pages/EditJob.jsx';
  import {action as editJobAction} from './pages/EditJob.jsx';
  import {action as deleteJobAction} from './pages/DeleteJob.jsx';
  import {loader as adminLoader} from './pages/Admin.jsx';

  // const App = () => {
  //   return (
  //     <>
  //     <Router>
  //       <Routes>
  //         <Route path='/' element={<HomeLayout/>} errorElement={<Error />}>
  //         <Route index element={<Landing/>}></Route>
  //         <Route path='register' element={<Register/>}></Route>
  //         <Route path='login' element={<Login/>}></Route>    
  //         </Route>
  //         {/* <Route path='/error' element={<Error/>}></Route> */}
  //         <Route path='/dashboard' element={<DashboardLayout/>}></Route>
  //         <Route path='*' element={<Error/>}></Route>
  //       </Routes>
  //     </Router>
  //     </>
  //   )
  // }


  export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme',isDarkTheme);
  return isDarkTheme;
  }

  checkDefaultTheme();

  const router = createBrowserRouter([
  {
  path: '/',
  element: <HomeLayout />,
  errorElement:<Error/>,
  children: [
    {
      index:true,
      element:<Landing/>
    },
    {
      path: 'register',
      element: <Register />,
      action: registerAction
    },
    {
      path: 'login',
      element: <Login />,
      action: loginAction,
    },
    {
      path: 'dashboard',
      element: <DashboardLayout/>,
      loader:dashboardLoader,
      children:[
        {
          index:true,
          element:<AddJob/>,
          action:addjobAction,
        },
        {
          path:"stats",
          element:<Stats/>
        },
        {
          path:"all-jobs",
          element:<AllJobs/>,
          loader:alljobsLoader
        },
        {
          path:"profile",
          element:<Profile/>
        },
        {
          path:"admin",
          element:<Admin/>,
          loader: adminLoader,
        },
        {
          path:'edit-job/:id',
          element:<EditJob/>,
          loader:editJobLoader,
          action:editJobAction,
        },
        {
          path:'delete-jobs/:id',
          action:deleteJobAction,
        }
      ]
    },
  ],
  },
  ]);
















  const App = () => {
  return <RouterProvider router={router} />;
  };
















  export default App
