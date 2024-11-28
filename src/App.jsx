import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SplashScreen from "./pages/SplashScreen";
import MainPage from "./pages/MainPage";
import GetStarted from "./pages/GetStarted";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SelectCountry from "./pages/SelectCountry";
import FillProfile from "./pages/FillProfile";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import ComplainForm from "./pages/ComplainForm";
import MapLocationFinder from "./pages/MapLocationFinder";
import LegalPractitioner from "./pages/LegalPractitioner";
import Chatting from "./pages/Chatting";
import Call from "./pages/Call";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/login" element={<SignUp/>} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/select-country" element={<SelectCountry/>} />
        <Route path="/fill-profile" element={<FillProfile/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/donate" element={<Donate/>} />
        <Route path="/complaint-form" element={<ComplainForm/>} />
        <Route path="/find-location" element={<MapLocationFinder/>} />
        <Route path="/select" element={<LegalPractitioner/>} />
        <Route path="/chat" element={<Chatting/>} />
        <Route path="/call" element={<Call/>} />
      </Routes>
    </Router>
  );
}

export default App;
