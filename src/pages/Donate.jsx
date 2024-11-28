import { useState } from 'react';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';
import '../styles/Donate.css';

// DonationLayout component for shared layout
// eslint-disable-next-line react/prop-types
const DonationLayout = ({ children, title, onBack }) => {
  return (
    <div className="container">
      <div className="header">
        <button onClick={onBack} className="header-button">
          <ArrowLeft className="icon" />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      {children}
    </div>
  );
};

// Initial Donation Page
// eslint-disable-next-line react/prop-types
const DonatePage = ({ onNavigate }) => {
  return (
    <DonationLayout title="Donate" onBack={() => onNavigate('/')}>
      <div className="space-y-6">
        <div>
          <label className="label">Amount</label>
          <div className="donation-amount">
            <span>$209.97</span>
          </div>
        </div>

        <div>
          <div className="payment-method">
            <label className="label">Payment Method</label>
            <button className="change-button" onClick={() => onNavigate('payment-methods')}>
              Change
            </button>
          </div>
          <div className="payment-option">
            <img src="/api/placeholder/24/24" alt="PayPal" className="icon" />
            <span>PayPal</span>
          </div>
        </div>

        <button onClick={() => onNavigate('donation-success')} className="donate-button">
          Donate
        </button>
      </div>
    </DonationLayout>
  );
};

// Payment Methods Page
// eslint-disable-next-line react/prop-types
const PaymentMethodsPage = ({ onNavigate }) => {
  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: '/api/placeholder/24/24' },
    { id: 'googlepay', name: 'Google Pay', icon: '/api/placeholder/24/24' },
    { id: 'applepay', name: 'Apple Pay', icon: '/api/placeholder/24/24' },
    { id: 'visa', name: 'VISA', icon: '/api/placeholder/24/24' },
    { id: 'mastercard', name: 'Master Card', icon: '/api/placeholder/24/24' },
    { id: 'credit', name: 'Credit Card', icon: '/api/placeholder/24/24' },
    { id: 'balance', name: "Tuke's Balance", icon: '/api/placeholder/24/24' },
  ];

  return (
    <DonationLayout title="Donate" onBack={() => onNavigate('/')}>
      <div className="space-y-6">
        <div>
          <label className="label">Amount</label>
          <div className="donation-amount">
            <span>$209.97</span>
          </div>
        </div>

        <div>
          <div className="payment-method">
            <label className="label">Payment Method</label>
          </div>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="payment-method-list"
                onClick={() => onNavigate('/')}
              >
                <div className="payment-option">
                  <img src={method.icon} alt={method.name} className="icon" />
                  <span>{method.name}</span>
                </div>
                <ChevronRight className="chevron-icon" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DonationLayout>
  );
};

// Success Page
// eslint-disable-next-line react/prop-types
const DonationSuccessPage = ({ onNavigate }) => {
  return (
    <div className="success-container">
      <div className="success-icon-wrapper">
        <div className="success-icon">
          <Check className="icon" />
        </div>
      </div>
      <h1 className="success-title">Donation Success!</h1>
      <p className="success-text">Thanks for giving a helping hand.</p>
      <button onClick={() => onNavigate('/')} className="success-button">
        Donate again
      </button>
    </div>
  );
};

// Main App Component
const Donate = () => {
  const [currentPage, setCurrentPage] = useState('donate');

  const renderPage = () => {
    switch (currentPage) {
      case 'payment-methods':
        return <PaymentMethodsPage onNavigate={setCurrentPage} />;
      case 'donation-success':
        return <DonationSuccessPage onNavigate={setCurrentPage} />;
      default:
        return <DonatePage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
};

export default Donate;
