import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import HomeLayout from './pages/HomeLayout.jsx';
import {HomeLayout,Error,Landing,Register,Login,DashboardLayout,AddJob,Profile,Stats,Admin,AllJobs} from './pages';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import {action as registerAction } from './pages/Register.jsx';


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
    },
    {
      path: 'dashboard',
      element: <DashboardLayout/>,
      children:[
        {
          index:true,
          element:<AddJob/>
        },
        {
          path:"stats",
          element:<Stats/>
        },
        {
          path:"all-jobs",
          element:<AllJobs/>
        },
        {
          path:"profile",
          element:<Profile/>
        },
        {
          path:"admin",
          element:<Admin/>
        },
      ]
    },
  ],
},
]);




const App = () => {
return <RouterProvider router={router} />;
};




export default App
