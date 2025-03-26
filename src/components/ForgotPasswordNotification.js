import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordNotification() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/');
  //   }, 3000);

  //   return () => clearTimeout(timer); // Component unmount olursa timeout'u temizle
  // }, [navigate]);

  return (
    <div className='register__inner'>
      <h2 className='register_head'>Check the link that we sent to your email, for changing your password</h2>
    </div>
  );
}

export default ForgotPasswordNotification;
