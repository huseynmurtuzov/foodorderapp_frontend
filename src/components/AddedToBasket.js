import React, { useEffect, useState } from "react";

function AddedToBasket({ text }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3 saniye sonra kapanacak

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="addToBasket">
      <p className="addToBasket_text">{text}</p>
      <button className="closeButton" onClick={() => setVisible(false)}>×</button>
      <div className="loadingBar"></div>
    </div>
  );
}

export default AddedToBasket;
