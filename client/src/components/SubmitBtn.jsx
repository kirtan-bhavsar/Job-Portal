import React from 'react';
import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({FormButton}) => {

 const navigation = useNavigation();
 const isSubmitting = navigation.state === 'submitting';

  return (
    <button type='submit' className={`btn btn-block ${FormButton && 'form-btn'}`}>
       {isSubmitting ? "Submitting..." : "Submit"}
     </button>
  )
}

export default SubmitBtn;