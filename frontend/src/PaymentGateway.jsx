import React, { useState } from 'react';

export default function PaymentGateway({ product, onBack }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:8000/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': crypto.randomUUID()
        },
        body: JSON.stringify({
          transaction: {
            total_amount: product.price,
            user_uuid: crypto.randomUUID()
          }
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Payment failed: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      alert(`Connection error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-container" style={{ textAlign: 'center', padding: '4rem 2rem', display: 'block' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2 className="product-selection-title" style={{ fontSize: '2rem' }}>Payment Successful</h2>
        <p className="product-selection-subtitle" style={{ marginBottom: '2rem' }}>Thank you for subscribing to the {product.name}.</p>
        <button className="btn-select outline" style={{ maxWidth: '200px', margin: '0 auto' }} onClick={onBack}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-sidebar">
        <button className="back-btn" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
        <div className="summary-title">Subscribe to</div>
        <div className="summary-price">${product.price}.00 <span style={{fontSize:'1rem', color: 'var(--text-muted)', fontWeight: 400}}>per month</span></div>
        
        <div className="summary-item">
          <span className="summary-item-name">{product.name}</span>
          <span className="summary-item-price">${product.price}.00</span>
        </div>
        <div className="summary-item" style={{ borderBottom: 'none', fontWeight: 600 }}>
          <span>Total due today</span>
          <span>${product.price}.00</span>
        </div>
      </div>

      <div className="checkout-main">
        <div className="checkout-header">
          <h2>Payment Details</h2>
        </div>
        
        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input type="email" className="form-input" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label className="form-label">Card Information</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="1234 5678 9101 1121" 
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: 0 }}
              required 
            />
            <div className="form-row" style={{ gap: 0 }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="MM/YY" 
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderRight: 0, borderBottomRightRadius: 0 }}
                required 
              />
              <input 
                type="text" 
                className="form-input" 
                placeholder="CVC" 
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0 }}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Name on card</label>
            <input type="text" className="form-input" placeholder="John Doe" required />
          </div>

          <button type="submit" className="btn-pay" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : `Pay $${product.price}.00`}
          </button>
          
          <div className="secure-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Payments are secure and encrypted
          </div>
        </form>
      </div>
    </div>
  );
}
