import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Home, Plus, Clock, User, Grid, Film, LayoutGrid } from "lucide-react";
import "../styles/Home.css";

const ProfileUI = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/api/placeholder/96/96"); // Default image
  
  useEffect(() => {
    // Retrieve the image from localStorage
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleFindLocationClick = (linkText) => {
    navigate("/find-location", { state: { linkText } });
  };

  const stats = [
    { label: "Reviews", value: "297" },
    { label: "Reported Cases", value: "356" },
    { label: "Solved Cases", value: "208" },
  ];

  const actions = [
    { label: "Donate", primary: true, route: "/donate" },
    { label: "File Complaint", primary: true, route: "/complaint-form" },
    { label: "Verify", primary: false },
  ];

  const quickActions = [
    { icon: <Plus className="icon" />, label: "Add" },
    { icon: "🏥", label: "Hospital" },
    { icon: "🌙", label: "Night" },
    { icon: "👥", label: "Friends" },
    { icon: "📱", label: "Nav" },
  ];

  const tabItems = [
    { icon: <Grid className="icon" />, label: "Feeds", active: true },
    { icon: <Film className="icon" />, label: "Shorts", active: false },
    { icon: <LayoutGrid className="icon" />, label: "Tab View", active: false },
  ];

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-header-top">
          <h1 className="profile-name">Favour E.</h1>
          <div className="header-actions">
            <button className="icon-button">
              <Clock className="icon" />
            </button>
            <button className="icon-button">
              <Search className="icon" />
            </button>
            <button className="icon-button">⋮</button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          <div className="profile-avatar">
            <img src={profileImage} alt="Profile" className="avatar-image" />
          </div>
          <h2 className="profile-subtitle">Favour E.</h2>
          <p className="profile-role">Change Maker</p>
          <a href="#" className="profile-link">www.web1.com</a>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`action-button ${action.primary ? "action-primary" : "action-secondary"}`}
              onClick={() => action.route && navigate(action.route)}
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="profile-search">
          <div className="search-links">
            <button
              onClick={() => handleFindLocationClick("Find a nearby Hospital")}
              className="link-button"
            >
              Find a nearby Hospital
            </button>
            <span className="separator">|</span>
            <button
              onClick={() => handleFindLocationClick("Police Station")}
              className="link-button"
            >
              Police Station
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {quickActions.map((action, index) => (
            <div key={index} className="quick-action-item">
              <div className="quick-action-icon">
                {typeof action.icon === "string" ? (
                  <span className="emoji">{action.icon}</span>
                ) : (
                  action.icon
                )}
              </div>
              <span className="quick-action-label">{action.label}</span>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          {tabItems.map((item, index) => (
            <button
              key={index}
              className={`tab-item ${item.active ? "tab-active" : ""}`}
            >
              {item.icon}
              <span className="tab-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="image-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="grid-item">
              <img
                src="/api/placeholder/150/150"
                alt={`Grid item ${index + 1}`}
                className="grid-image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <button className="nav-button nav-active">
          <Home className="icon" />
          <span className="nav-label">Home</span>
        </button>
        <button className="nav-button">
          <Search className="icon" />
          <span className="nav-label">Search</span>
        </button>
        <button className="nav-button center-button">
          <div className="plus-icon">
            <Plus className="icon" />
          </div>
        </button>
        <button className="nav-button">
          <Clock className="icon" />
          <span className="nav-label">Shorts</span>
        </button>
        <button className="nav-button">
          <User className="icon" />
          <span className="nav-label">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileUI;
