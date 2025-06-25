import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomeLayout from './pages/HomeLayout.jsx';
import { HomeLayout, Error, Landing, Register, Login, DashboardLayout, AddJob, Profile, Stats, Admin, AllJobs, EditJob } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { action as registerAction } from './pages/Register.jsx';
import { action as loginAction } from './pages/Login.jsx';
import { loader as dashboardLoader } from './pages/DashboardLayout.jsx';
import { action as addjobAction } from './pages/AddJob.jsx';
import { loader as alljobsLoader } from './pages/AllJobs.jsx';
import { loader as editJobLoader } from './pages/EditJob.jsx';
import { action as editJobAction } from './pages/EditJob.jsx';
import { action as deleteJobAction } from './pages/DeleteJob.jsx';
import { loader as adminLoader } from './pages/Admin.jsx';
import { action as profileAction } from './pages/Profile.jsx';
import { loader as statsLoader } from './pages/Stats.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorElement from './components/ErrorElement.jsx';

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
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}


checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      // staleTime:1000*10,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addjobAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: alljobsLoader(queryClient),
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          {
            path: 'delete-jobs/:id',
            action: deleteJobAction(queryClient),
          }
        ]
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
};


export default App
