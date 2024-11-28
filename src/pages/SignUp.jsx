import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider, firestore, setDoc, doc } from "../firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/SignUp.css";
import Button from "../components/Button";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import apple from "../assets/apple.png";
import hide from "../assets/hide.png";
import lock from "../assets/lock.png";
import arrowBack from "../assets/arrowBack.png";
import call from "../assets/call.png";
import bagCross from "../assets/bag-cross.png";
import darkMessage from "../assets/dark-message.png";


function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState("Select Account Type");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Save user details in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        phone,
        accountType,
      });
      navigate("/select-country", { state: { userId: user.uid } });
    } catch (error) {
      setErrorMessage(error.message); // Set error message
      console.error("Error during sign-up:", error.message);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setErrorMessage(""); // Clear previous errors
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        phone: user.phoneNumber || "Not provided",
        accountType: "Normal User", // Default if not selected
      });
      navigate("/select-country");
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.warn("Popup request was canceled. Only one popup is allowed at a time.");
      } else {
        setErrorMessage(error.message); // Set error message
        console.error("Error during social sign-in:", error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="back">
        <div>
          <img src={arrowBack} alt="arrowBack" />
        </div>
      </div>
      <h1>Create your Account</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      <form className="signup-form" onSubmit={handleSignUp}>
          <div className="signup-input-field-container">
            <div>
              <img src={darkMessage} alt="darkMessage" />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup-input-field-container">
            <div>
              <img src={bagCross} alt="bagCross" />
            </div>
            <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option>Select Account Type</option>
            <option>Normal User</option>
            <option>Legal Practitioner</option>
          </select>
          </div>
        
          <div className="signup-input-field-container">
            <div>
              <img src={call} alt="call" />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        <div className="signup-input-field-container">
            <div>
              <img src={lock} alt="lock" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <img src={hide} alt="hide" />
            </div>
          </div>
        <Button text="Sign up" handleClick={handleSignUp} />
      </form>
      <div className="alternative-signup">
        <p>or continue with</p>
        <div className="social-icons">
        <div  onClick={() => handleSocialSignIn(facebookProvider)}>
          <img src={facebook} alt="facebook" />
        </div>
        <div  onClick={() => handleSocialSignIn(googleProvider)}>
          <img src={google} alt="google" />
        </div>
        <div onClick={() => {}}>
          <img src={apple} alt="apple" />
        </div>
        </div>
      </div>
      <p className="mess">Don&apos;t have an Account? <a href="/login">Login</a></p>
    </div>
  );
}

export default SignUp;
