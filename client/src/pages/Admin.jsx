import React from 'react';
import {redirect, useLoaderData} from 'react-router-dom';
import { customFetch } from '../utils/customFetch';
import {toast} from 'react-toastify';
import Wrapper from '../assets/wrappers/StatsContainer.js';
import StatItem from '../components/StatItem.jsx';
import {FaSuitcaseRolling,FaCalendarCheck,FaUsers } from 'react-icons/fa';

export const loader = async() => {

  try {
    const {data} = await customFetch.get('/user/admin/app-stats');
    return data;
  } catch (error) {
    toast.error(error?.resposne?.data?.message || "Invalid Authentication");
    return redirect('/dashboard');
  }

}

const Admin = () => {

  const {users,jobs} = useLoaderData();

  return (
    <Wrapper>
      <StatItem icon={<FaUsers></FaUsers>} title='users' count={users} bcg='#e9b949' color='#fcefc7'></StatItem>
      <StatItem icon={<FaCalendarCheck></FaCalendarCheck>} title='jobs' count={jobs} bcg='#e0e8f9' color='#647acb'></StatItem>
    </Wrapper>
  )
}

export default Admin