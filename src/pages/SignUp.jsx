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
import show from "../assets/hide.png"; // New icon for showing password
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
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        phone,
        accountType,
      });
      navigate("/select-country", { state: { userId: user.uid } });
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error during sign-up:", error.message);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setErrorMessage("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        phone: user.phoneNumber || "Not provided",
        accountType: "Normal User",
      });
      navigate("/select-country");
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.warn("Popup request was canceled. Only one popup is allowed at a time.");
      } else {
        setErrorMessage(error.message);
        console.error("Error during social sign-in:", error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="back" onClick={()=>navigate(-1)}>
        <div>
          <img src={arrowBack} alt="arrowBack" />
        </div>
      </div>
      <h1>Create your Account</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={() => setShowPassword((prev) => !prev)}>
            <img src={showPassword ? show : hide} alt="toggle-password-visibility" />
          </div>
        </div>
        <Button text="Sign up" handleClick={handleSignUp} />
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
      <p className="mess">Don&apos;t have an Account? <a href="/login">Login</a></p>
    </div>
  );
}

export default SignUp;
