import React from 'react'
import { customFetch } from '../utils/customFetch';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const action = (queryClient) => async({params}) => {
  const {id} = params;
  try {
    await customFetch.delete(`/jobs/delete/${id}`);
    queryClient.invalidateQueries(['jobs']);
    toast.success('Job deleted successfully');
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect('/dashboard/all-jobs');
}

const DeleteJob = () => {
  return (<></>)
}

export default DeleteJob