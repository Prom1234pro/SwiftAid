import { Phone, Camera, Mic, Users, Video } from 'lucide-react';
import '../styles/Call.css'

const Call = () => {
  return (
    <div className="video-call-container">
      {/* Main caller display */}
      <div className="main-caller-display">
        <div className="caller-image-container">
          <img
            src="/api/placeholder/120/120"
            alt="Jane Cooper"
            className="caller-image"
          />
          <div className="online-status" />
        </div>
        <h2 className="caller-name">Jane Cooper</h2>
        <p className="call-time">12:30:00</p>
      </div>

      {/* Incoming call card */}
      <div className="incoming-call-card">
        <div className="incoming-call-details">
          <div className="incoming-caller-info">
            <img
              src="/api/placeholder/48/48"
              alt="Medley Steve"
              className="incoming-caller-image"
            />
            <div>
              <h3 className="incoming-caller-name">Medley Steve</h3>
              <p className="hold-call-text">tap here to hold call</p>
            </div>
          </div>
          <div className="call-control-buttons">
            <button className="accept-call-button">
              <Phone size={16} className="phone-icon" />
            </button>
            <button className="decline-call-button">
              <Phone size={16} className="phone-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="bottom-controls">
        <div className="control-buttons">
          <button className="control-button">
            <Users size={20} className="control-icon" />
          </button>
          <button className="control-button">
            <Video size={20} className="control-icon" />
          </button>
          <button className="control-button">
            <Camera size={20} className="control-icon" />
          </button>
          <button className="control-button">
            <Mic size={20} className="control-icon" />
          </button>
        </div>

        {/* End call button */}
        <button className="end-call-button">
          <Phone size={24} className="end-call-icon" />
        </button>
      </div>
    </div>
  );
};

export default Call;
