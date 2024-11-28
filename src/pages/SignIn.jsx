import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import "../styles/SignUp.css";
import Button from "../components/Button";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import apple from "../assets/apple.png";
import hide from "../assets/hide.png";
import lock from "../assets/lock.png";
import arrowBack from "../assets/arrowBack.png";
import darkMessage from "../assets/dark-message.png";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message); // Set error message
      console.error("Error during sign-in:", error.message);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setErrorMessage(""); // Clear previous errors
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.warn("Popup request was canceled.");
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
      <h1>Login To Your Account</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      <form className="signup-form" onSubmit={handleSignIn}>
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
        <Button text="Login" handleClick={handleSignIn} />
      </form>
      <div className="alternative-signup">
        <p>or continue with</p>
        <div className="social-icons">
          <div onClick={() => handleSocialSignIn(facebookProvider)}>
            <img src={facebook} alt="facebook" />
          </div>
          <div onClick={() => handleSocialSignIn(googleProvider)}>
            <img src={google} alt="google" />
          </div>
          <div onClick={() => {}}>
            <img src={apple} alt="apple" />
          </div>
        </div>
      </div>
      <p className="mess">
        Don&apos;t have an Account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default SignIn;
