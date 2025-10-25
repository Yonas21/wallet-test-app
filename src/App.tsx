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
  
  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setCurrentScreen('detail');
  };

  const handleBackToList = () => {
    setCurrentScreen('list');
    setSelectedTransaction(null);
  };

  return (
    <div className="App">
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
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
