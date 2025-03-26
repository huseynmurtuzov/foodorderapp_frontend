import React, { useState, useEffect } from 'react';

function RemoveFromBasket({ text,errorkey }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (text) {
      setVisible(true);
 // Key değişiyor, React bileşeni sıfırdan oluşturuyor
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorkey]); // text değiştiğinde çalışır

  if (!visible) return null;

  return (
    <div key={errorkey} className='removeFromBasket'> {/* Key değiştiği için bileşen resetlenir */}
      <p className='removeFromBasket_text'>{text}</p>
      <button className="closeButton" onClick={() => setVisible(false)}>×</button>
      <div className="loadingBar"></div>
    </div>
  );
}

export default RemoveFromBasket;
