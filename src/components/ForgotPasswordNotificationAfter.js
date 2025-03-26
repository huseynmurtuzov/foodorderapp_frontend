import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordNotificationAfter() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer); // Component unmount olursa timeout'u temizle
  }, [navigate]);

  return (
    <div className='register__inner'>
      <h2 className='register_head'>Password changed successfully, returning to the home page</h2>
    </div>
  );
}

export default ForgotPasswordNotificationAfter;
