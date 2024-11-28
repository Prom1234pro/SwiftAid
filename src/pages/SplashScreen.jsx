// SplashScreen.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreen.css";
import whiteSpinner from "../assets/white-spinner.png";
import lemonSpinner from "../assets/lemon-spinner.png";
import whiteLogo from "../assets/white-logo.png";
import coloredLogo from "../assets/colored-logo.png";

function SplashScreen() {
  const [showFirstScreen, setShowFirstScreen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setShowFirstScreen(false); 
    }, 3000); 

    const secondTimer = setTimeout(() => {
      navigate("/main");
    }, 6000); 

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
    };
  }, [navigate]);

  return (
    <div className="splash-screen">
      {showFirstScreen ? (
        <div className="first-splash">
          <div className="logo-container">
            <img src={whiteLogo} className="logo"/>
          </div>
          <img src={whiteSpinner} className="loader"></img>
        </div>
      ) : (
        <div className="second-splash">
          <div className="logo-container">
            <img src={coloredLogo} className="logo"/>
          </div>
          <img src={lemonSpinner} className="loader"></img>
        </div>
      )}
    </div>
  );
}

export default SplashScreen;
