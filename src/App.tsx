import React, { useState } from 'react';
import { AppData, Transaction } from './types';
import TransactionsList from './components/TransactionsList';
import TransactionDetail from './components/TransactionDetail';
import './App.css';

// Import data with proper typing and error handling
let data: AppData;
try {
  const dataJson = require('./data.json');
  data = dataJson as AppData;
} catch (error) {
  console.error('Error loading data:', error);
  // Fallback data to prevent crashes
  data = {
    user: {
      cardLimit: 1500,
      cardBalance: 17.30,
      availableBalance: 1482.70,
      paymentStatus: "You've paid your September balance."
    },
    transactions: []
  };
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'list' | 'detail'>('list');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  console.log('Wallet App loaded with data:', data);

  const handleTransactionClick = (transaction: Transaction) => {
    console.log('Transaction clicked:', transaction);
    setSelectedTransaction(transaction);
    setCurrentScreen('detail');
  };

  const handleBackToList = () => {
    console.log('Back button clicked');
    setCurrentScreen('list');
    setSelectedTransaction(null);
  };

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ padding: '10px', background: '#e0e0e0', fontSize: '12px' }}>
        Debug: Screen={currentScreen}, Selected={selectedTransaction?.name || 'None'}
      </div>
      {currentScreen === 'list' ? (
        <TransactionsList 
          data={data} 
          onTransactionClick={handleTransactionClick}
        />
      ) : selectedTransaction ? (
        <TransactionDetail 
          transaction={selectedTransaction} 
          onBack={handleBackToList}
        />
      ) : (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Loading Wallet App...</h1>
          <p>Please wait while we load your transactions.</p>
        </div>
      )}
    </div>
  );
}

export default App;
