import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import search from "../assets/search.png";
import albania from "../assets/albania.png";
import algeria from "../assets/algeria.png";
import andorra from "../assets/andorra.png";
import angola from "../assets/angola.png";
import argentina from "../assets/argentina.png";
import armenia from "../assets/armenia.png";
import india from "../assets/india.png";
import iraq from "../assets/iraq.png";
import iran from "../assets/iran.png";
import nigeria from "../assets/nigeria.png";
import Button from "../components/Button";
import "../styles/SelectCountry.css";
import LayoutContainer from "../components/LayoutContainer";

const countries = [
  { code: "AL", name: "Albania", flag: albania },
  { code: "DZ", name: "Algeria", flag: algeria },
  { code: "AD", name: "Andorra", flag: andorra },
  { code: "AO", name: "Angola", flag: angola },
  { code: "AR", name: "Argentina", flag: argentina },
  { code: "AM", name: "Armenia", flag: armenia },
  { code: "IN", name: "India", flag: india },
  { code: "IQ", name: "Iraq", flag: iraq },
  { code: "IR", name: "Iran", flag: iran },
  { code: "NG", name: "Nigeria", flag: nigeria },
];

function SelectCountry() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {}; // Retrieve the user ID from navigation state

  const handleSelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
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

  // Filter countries based on the search query
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery)
  );

  return (
    <LayoutContainer headingText={"Select Your Country"}>
      <div className="signup-input-field-container">
        <div>
          <img src={search} alt="Search Icon" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="country-list">
        {filteredCountries.map((country) => (
          <li
            key={country.code}
            className={`country-item ${selectedCountry === country.code ? "selected" : ""}`}
            onClick={() => handleSelect(country.code)}
          >
            <img src={country.flag} alt={country.name} />
            <span className="code">{country.code}</span>
            <span className="name">{country.name}</span>
            <span className="radio">{selectedCountry === country.code ? "●" : "○"}</span>
          </li>
        ))}
      </ul>
      <Button text="Continue" handleClick={handleClick} />
    </LayoutContainer>
  );
}

export default SelectCountry;
