import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import Button from "../components/Button";
import "../styles/SelectCountry.css";

const countries = [
  { code: "AF", name: "Afghanistan", flag: "🇦🇫" },
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿" },
  { code: "AD", name: "Andorra", flag: "🇦🇩" },
  { code: "AO", name: "Angola", flag: "🇦🇴" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", flag: "🇦🇲" },
  // Add more countries here as needed
];

function SelectCountry() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {}; // Retrieve the user ID from navigation state

  const handleSelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const handleClick = async () => {
    if (userId && selectedCountry) {
      try {
        const userRef = doc(firestore, "users", userId);
        await updateDoc(userRef, { country: selectedCountry });
        navigate("/fill-profile", { state: { userId } });
      } catch (error) {
        console.error("Error updating country:", error.message);
      }
    } else {
      alert("Please select a country.");
    }
  };

  return (
    <div className="country-container">
      <button className="back-button" onClick={() => navigate(-1)}>←</button>
      <h1>Select Your Country</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <ul className="country-list">
        {countries.map((country) => (
          <li
            key={country.code}
            className={`country-item ${selectedCountry === country.code ? "selected" : ""}`}
            onClick={() => handleSelect(country.code)}
          >
            <span className="flag">{country.flag}</span>
            <span className="name">{country.name}</span>
            <span className="radio">{selectedCountry === country.code ? "●" : "○"}</span>
          </li>
        ))}
      </ul>
      <Button text="Continue" handleClick={handleClick} />
    </div>
  );
}

export default SelectCountry;
