import { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router
import '../styles/LegalPractitioner.css'

const LegalPractitioner = () => {
  const [selectedPractitioners, setSelectedPractitioners] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();  // Initialize the navigate function

  const practitioners = [
    {
      id: 1,
      name: "Jane Cooper",
      company: "Associates & Co",
      imageUrl: "/api/placeholder/40/40",
      status: "online"
    },
    {
      id: 2,
      name: "Esther Howard",
      company: "Associates & Co",
      imageUrl: "/api/placeholder/40/40",
      status: "offline"
    },
    {
      id: 3,
      name: "Brooklyn Simmons",
      company: "Associates & Co",
      imageUrl: "/api/placeholder/40/40",
      status: "online"
    },
    {
      id: 4,
      name: "Guy Hawkins",
      company: "Associates & Co",
      imageUrl: "/api/placeholder/40/40",
      status: "offline"
    },
    {
      id: 5,
      name: "Jenny Wilson",
      company: "Associates & Co",
      imageUrl: "/api/placeholder/40/40",
      status: "online"
    },
    {
      id: 6,
      name: "James Mark",
      company: "Associates & Co",
      imageUrl: "/api/placeholder/40/40",
      status: "online"
    }
  ];

  const togglePractitioner = (id) => {
    const newSelected = new Set(selectedPractitioners);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPractitioners(newSelected);
  };

  const handleContinue = () => {
    // Navigate to the chat page and pass selected practitioners as state
    navigate('/chat', { state: { selectedPractitioners: Array.from(selectedPractitioners) } });
  };

  return (
    <div className="legal-practitioner-container">
      <div className="header">
        <div className="header-row">
          <button className="back-button">
            <ChevronLeft size={24} />
          </button>
          <h1 className="header-title">Find a Legal Practitioner</h1>
        </div>
        <p className="header-subtitle">
          Get instant feedback. Contact a lawyer to lay a complain.
        </p>
      </div>

      <div className="search-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="practitioners-list">
        {practitioners.map((practitioner) => (
          <div
            key={practitioner.id}
            className="practitioner-item"
            onClick={() => togglePractitioner(practitioner.id)}
          >
            <div className="practitioner-info">
              <div className="image-container">
                <img
                  src={practitioner.imageUrl}
                  alt={practitioner.name}
                  className="profile-image"
                />
                <div className={`status-indicator ${practitioner.status === 'online' ? 'online' : 'offline'}`}></div>
              </div>
              <div>
                <h3 className="practitioner-name">{practitioner.name}</h3>
                <p className="practitioner-company">{practitioner.company}</p>
              </div>
            </div>
            <button
              className={`status-button ${selectedPractitioners.has(practitioner.id) ? 'selected' : ''}`}
            >
              {selectedPractitioners.has(practitioner.id) ? 'Online' : 'Offline'}
            </button>
          </div>
        ))}
      </div>

      <div className="continue-button-container">
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LegalPractitioner;
