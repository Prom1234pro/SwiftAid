import "../styles/MainPage.css";
import Illustration from "../assets/internet-people.png";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState, useEffect } from "react";

function WelcomeScreen() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animationState, setAnimationState] = useState("slide-in-right");

  const tabs = [
    {
      title: "The Best & Fast",
      subtitle: "Emergency Response App",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "The Quick & Reliable",
      subtitle: "Emergency Response App",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setAnimationState("slide-out-left"); // Start sliding out
        setTimeout(() => {
          setCurrentTab((prevTab) => (prevTab + 1) % tabs.length);
          setAnimationState("slide-in-right"); // Slide in the next tab
        }, 500); // Match the duration of the slide-out animation
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isPaused, tabs.length]);

  const handleClick = () => {
    navigate("/get-started");
  };

  return (
    <div className="welcome-screen">
      <div className="illustration-container">
        <img src={Illustration} alt="illustration" />
      </div>
      <div
        className="content"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        <div className={`tab ${animationState}`}>
          <h2>{tabs[currentTab].title}</h2>
          <h2>{tabs[currentTab].subtitle}</h2>
          <p>{tabs[currentTab].description}</p>
        </div>
        <div className="dot-section">
          {tabs.map((_, index) => (
            <div
              key={index}
              className={index === currentTab ? "active" : ""}
            ></div>
          ))}
        </div>
      </div>
      <Button text="Next" handleClick={handleClick} />
    </div>
  );
}

export default WelcomeScreen;
