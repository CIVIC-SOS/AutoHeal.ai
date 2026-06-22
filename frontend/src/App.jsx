import React, { useState } from 'react';
import ProductSelection from './ProductSelection';
import PaymentGateway from './PaymentGateway';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app-container">
      {!selectedProduct ? (
        <ProductSelection onSelectProduct={handleSelectProduct} />
      ) : (
        <PaymentGateway product={selectedProduct} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
