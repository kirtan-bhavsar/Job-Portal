import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import HomeLayout from './pages/HomeLayout.jsx';
import {HomeLayout,Error,Landing,Register,Login,DashboardLayout,AddJob,Profile,Stats,Admin,AllJobs} from './pages';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

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
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
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