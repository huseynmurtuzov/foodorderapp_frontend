import React from 'react'
import { useState,useEffect } from 'react';


function RemoveFromBasket({ text }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3 saniye sonra kapanacak

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className='removeFromBasket'>
        <p className='removeFromBasket_text'>{text}</p>
        <button className="closeButton" onClick={() => setVisible(false)}>×</button>
        <div className="loadingBar"></div>
    </div>
  );
}

export default RemoveFromBasket;