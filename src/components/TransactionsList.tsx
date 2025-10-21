import React from 'react';
import { AppData, Transaction } from '../types';
import { calculateDailyPoints } from '../utils/dailyPoints';
import './TransactionsList.css';

interface TransactionsListProps {
  data: AppData;
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ data, onTransactionClick }) => {
  // Safe daily points calculation with error handling
  let dailyPoints;
  try {
    dailyPoints = calculateDailyPoints();
  } catch (error) {
    console.error('Error calculating daily points:', error);
    dailyPoints = { points: 456, formattedPoints: '456K' }; // Fallback
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
  };

  const getTransactionIcon = (iconName: string) => {
    // For simplicity, using generic icons - in a real app, you'd have specific brand icons
    switch (iconName) {
      case 'apple':
        return '🍎';
      case 'payment':
        return '💳';
      case 'ikea':
        return '🏠';
      case 'target':
        return '🎯';
      case 'starbucks':
        return '☕';
      case 'amazon':
        return '📦';
      case 'gas':
        return '⛽';
      default:
        return '💳';
    }
  };

  const formatAmount = (amount: number, type: string): string => {
    const prefix = type === 'Payment' ? '+' : '';
    return `${prefix}$${amount.toFixed(2)}`;
  };

  return (
    <div className="transactions-list">
      {/* Header */}
      <div className="header">
        <h1>Wallet</h1>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        {/* Card Balance */}
        <div className="summary-card card-balance">
          <h3>Card Balance</h3>
          <div className="amount">${data.user.cardBalance.toFixed(2)}</div>
          <div className="available">${data.user.availableBalance.toFixed(2)} Available</div>
        </div>

        {/* No Payment Due */}
        <div className="summary-card no-payment">
          <h3>No Payment Due</h3>
          <div className="message">{data.user.paymentStatus}</div>
        </div>

        {/* Daily Points */}
        <div className="summary-card daily-points">
          <h3>Daily Points</h3>
          <div className="points-container">
            <div className="points">{dailyPoints.formattedPoints}</div>
            <button className="points-button">
              ✓
            </button>
          </div>
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="transactions-section">
        <h2>Latest Transactions</h2>
        <div className="transactions">
          {(data.transactions || []).slice(0, 10).map((transaction) => (
            <div 
              key={transaction.id} 
              className="transaction-item"
              onClick={() => {
                console.log('Transaction item clicked:', transaction);
                onTransactionClick(transaction);
              }}
            >
              <div className="transaction-icon">
                {getTransactionIcon(transaction.icon)}
              </div>
              <div className="transaction-details">
                <div className="transaction-name">{transaction.name}</div>
                <div className="transaction-description">
                  {transaction.status === 'Pending' && 'Pending - '}
                  {transaction.description}
                  {transaction.authorizedBy && ` - ${transaction.authorizedBy}`}
                </div>
                <div className="transaction-date">
                  {transaction.authorizedBy ? `${transaction.authorizedBy} - ` : ''}
                  {formatDate(transaction.date)}
                </div>
              </div>
              <div className="transaction-amount">
                <div className="amount">{formatAmount(transaction.amount, transaction.type)}</div>
                {transaction.cashback > 0 && (
                  <div className="cashback">{transaction.cashback}%</div>
                )}
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
