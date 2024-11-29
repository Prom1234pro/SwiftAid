import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import LayoutContainer from "../components/LayoutContainer";
import "../styles/Donate.css";

// Initial Donation Page
const DonatePage = ({ onNavigate, amount, setAmount, selectedMethod }) => {
  return (
    <LayoutContainer headingText="Donate" onBack={() => onNavigate("/")}>
      <div className="space-y-6">
        <div>
          <label className="label">Amount</label>
          <div className="donation-amount">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="amount-input"
              min="1"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div>
          <div className="payment-method">
            <label className="label">Payment Method</label>
            <button
              className="change-button"
              onClick={() => onNavigate("payment-methods")}
            >
              Change
            </button>
          </div>
          <div className="payment-option">
            <img src={selectedMethod.icon} alt={selectedMethod.name} className="icon" />
            <span>{selectedMethod.name}</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate("donation-success")}
          className="donate-button"
          disabled={!amount || !selectedMethod}
        >
          Donate
        </button>
      </div>
    </LayoutContainer>
  );
};

// Payment Methods Page
const PaymentMethodsPage = ({ onNavigate, setSelectedMethod, methods }) => {
  return (
    <LayoutContainer headingText="Payment Methods" onBack={() => onNavigate("donate")}>
      <div className="space-y-6">
        <div className="space-y-4">
          {methods.map((method) => (
            <div
              key={method.id}
              className="payment-method-list"
              onClick={() => {
                setSelectedMethod(method);
                onNavigate("donate");
              }}
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
    </LayoutContainer>
  );
};

// Success Page
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
      <button onClick={() => onNavigate("/")} className="success-button">
        Donate again
      </button>
    </div>
  );
};

// Main App Component
const Donate = () => {
  const [currentPage, setCurrentPage] = useState("donate");
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState({
    id: "paypal",
    name: "PayPal",
    icon: "/api/placeholder/24/24",
  });

  const paymentMethods = [
    { id: "paypal", name: "PayPal", icon: "/api/placeholder/24/24" },
    { id: "googlepay", name: "Google Pay", icon: "/api/placeholder/24/24" },
    { id: "applepay", name: "Apple Pay", icon: "/api/placeholder/24/24" },
    { id: "visa", name: "VISA", icon: "/api/placeholder/24/24" },
    { id: "mastercard", name: "Master Card", icon: "/api/placeholder/24/24" },
    { id: "credit", name: "Credit Card", icon: "/api/placeholder/24/24" },
    { id: "balance", name: "Tuke's Balance", icon: "/api/placeholder/24/24" },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "payment-methods":
        return (
          <PaymentMethodsPage
            onNavigate={setCurrentPage}
            setSelectedMethod={setSelectedMethod}
            methods={paymentMethods}
          />
        );
      case "donation-success":
        return <DonationSuccessPage onNavigate={setCurrentPage} />;
      default:
        return (
          <DonatePage
            onNavigate={setCurrentPage}
            amount={amount}
            setAmount={setAmount}
            selectedMethod={selectedMethod}
          />
        );
    }
  };

  return renderPage();
};

export default Donate;
