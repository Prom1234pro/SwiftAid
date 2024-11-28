import "../styles/GetStarted.css";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, firestore, setDoc, doc } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Button from "../components/Button";
import Illustration from "../assets/mirrow-guy.png";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import apple from "../assets/apple.png";

function GetStarted() {
  const navigate = useNavigate();

  const handleSocialSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        phone: user.phoneNumber || "Not provided",
        accountType: "Normal User", // Default if not selected
      });
      navigate("/select-country", { state: { userId: user.uid } });
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.warn("Popup request was canceled. Only one popup is allowed at a time.");
      } else {
        console.error("Error during social sign-in:", error.message);
      }
    }
  };
  const handleClick = () => {
      navigate("/login");
  };
  return (
    <div className="get-started-screen">
      <div className="illustration-container">
        <img src={Illustration} alt="illustration" /> 
      </div>
      <h2>Get started with SwiftAid</h2>

      <div className="auth-buttons">
        <button className="auth-button facebook">
          <img src={facebook} alt="facebook" />
          <p>Continue with Facebook</p>
        </button>
        <button className="auth-button google" onClick={() => handleSocialSignIn(googleProvider)}>
          <img src={google} alt="google" />
          <p>Continue with Google</p>
          </button>
        <button className="auth-button apple">
          <img src={apple} alt="apple" />
          <p>Continue with Apple</p>
          </button>
      </div>

      <div className="or-divider">
        <span>or</span>
      </div>
      <Button text="Sign in with password" handleClick={handleClick}/>

      <div className="signup-link">
        <span>Don’t have an account? <a href="/signup">Sign up</a></span>
      </div>
    </div>
  );
}

export default GetStarted;
