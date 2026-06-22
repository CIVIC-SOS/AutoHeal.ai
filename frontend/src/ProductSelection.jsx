import React from 'react';

const products = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 15,
    features: ['1 User', '5GB Storage', 'Community Support'],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 49,
    popular: true,
    features: ['5 Users', '50GB Storage', 'Priority Support', 'Advanced Analytics'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 199,
    features: ['Unlimited Users', '500GB Storage', '24/7 Dedicated Support', 'Custom Integrations'],
  }
];

export default function ProductSelection({ onSelectProduct }) {
  return (
    <div className="product-selection-container">
      <h1 className="product-selection-title">Choose Your Perfect Plan</h1>
      <p className="product-selection-subtitle">Unlock the full potential of our platform.</p>

      <div className="pricing-grid">
        {products.map((product) => (
          <div key={product.id} className="pricing-card">
            {product.popular && <div className="pricing-card-popular">Most Popular</div>}
            <h3 className="pricing-card-title">{product.name}</h3>
            <div className="pricing-card-price">
              ${product.price}<span>/mo</span>
            </div>
            <ul className="pricing-features">
              {product.features.map((feature, idx) => (
                <li key={idx}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className={`btn-select ${product.popular ? '' : 'outline'}`}
              onClick={() => onSelectProduct(product)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
