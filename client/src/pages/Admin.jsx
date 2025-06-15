import React from 'react';
import {redirect, useLoaderData} from 'react-router-dom';
import { customFetch } from '../utils/customFetch';
import {toast} from 'react-toastify';

export const loader = async() => {

  try {
    const {data} = await customFetch.get('/user/admin/app-stats');
    // console.log(response);
    return data;
  } catch (error) {
    toast.error(error?.resposne?.data?.message || "Invalid Authentication");
    return redirect('/dashboard');
  }

}

const Admin = () => {

  const data = useLoaderData();
  console.log(data);

  return (
    <h1>Admin</h1>
  )
}

export default Admin