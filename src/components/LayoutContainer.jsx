import { useNavigate } from "react-router-dom";
import arrowBack from "../assets/arrowBack.png";
import "../styles/LayoutContainer.css";

// eslint-disable-next-line react/prop-types
function LayoutContainer({ headingText, children, rightComponent }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="layout-container">
      <div className="heading">
        <div onClick={handleBackClick} className="back-button" style={{ cursor: "pointer" }}>
          <img src={arrowBack} alt="arrowBack" />
        </div>
        <div className="heading-text">{headingText}</div>
        <div className="right-component">
          {rightComponent}
        </div>
      </div>
      {children}
    </div>
  );
}

export default LayoutContainer;
