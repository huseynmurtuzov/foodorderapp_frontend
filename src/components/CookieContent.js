import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <p>
        🍪 We use cookies to enhance your experience. By continuing, you agree
        to our <a href="/cookie-policy">Cookie Policy</a>.
      </p>
      <div className="cookie-buttons">
        <button className="accept-btn" onClick={handleAccept}>
          Accept
        </button>
        <button className="decline-btn" onClick={handleDecline}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
