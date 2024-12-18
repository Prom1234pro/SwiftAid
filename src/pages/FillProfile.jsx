import { useState } from "react";
import { useNavigate } from "react-router-dom";
import edit from "../assets/edit.png";
import Button from "../components/Button";
import lightMessage from "../assets/light-message.png";
import avatar from "../assets/avatar.png";
import "../styles/FillProfile.css";
import LayoutContainer from "../components/LayoutContainer";

function FillProfile() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    occupation: "",
    country: "NG", // Default country
    avatarUrl: "", // Store uploaded avatar URL
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        localStorage.setItem("avatarUrl", base64Image); // Save Base64 string in localStorage
        setImagePreview(base64Image);
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const avatarUrl = localStorage.getItem("avatarUrl") || profileData.avatarUrl;

    navigate("/home", { state: { avatarUrl } }); 
    
  };

  return (
    <LayoutContainer headingText="Fill Your Profile">

      <div className="avatar-section">
        <div className="avatar">
          <img src={imagePreview || avatar} alt="Avatar" />
          <label className="edit-button">
            <img src={edit} alt="edit" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="signup-input-field-container">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={profileData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="signup-input-field-container">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={profileData.username}
            onChange={handleChange}
          />
        </div>
        <div className="signup-input-field-container">
          <input
            type="date"
            placeholder="Date of Birth"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="signup-input-field-container">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
          <div>
            <img src={lightMessage} alt="darkMessage" />
          </div>
        </div>
        <div className="signup-input-field-container">
          <select
            name="country"
            className="country"
            value={profileData.country}
            onChange={handleChange}
          >
            <option value="NG">🇳🇬</option>
            <option value="US">🇺🇸</option>
            <option value="GB">🇬🇧</option>
            {/* Add more country codes here */}
          </select>
          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="signup-input-field-container">
          <input
            type="text"
            placeholder="Occupation"
            name="occupation"
            value={profileData.occupation}
            onChange={handleChange}
          />
        </div>
        <Button text="Continue" />
      </form>
    </LayoutContainer>

  );
}

export default FillProfile;
