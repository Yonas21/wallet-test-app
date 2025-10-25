import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faCreditCard, faCar, faShoppingBag, faMusic, faVideo } from '@fortawesome/free-solid-svg-icons';
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
    switch (iconName) {
      case 'apple':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.66 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        );
      case 'payment':
        return <FontAwesomeIcon icon={faCreditCard} />;
      case 'ikea':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        );
      case 'target':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="#E31837"/>
            <circle cx="12" cy="12" r="6" fill="white"/>
            <circle cx="12" cy="12" r="2" fill="#E31837"/>
          </svg>
        );
      case 'starbucks':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          </svg>
        );
      case 'amazon':
        return <FontAwesomeIcon icon={faShoppingBag} />;
      case 'gas':
        return <FontAwesomeIcon icon={faCar} />;
      case 'netflix':
        return <FontAwesomeIcon icon={faVideo} />;
      case 'spotify':
        return <FontAwesomeIcon icon={faMusic} />;
      case 'uber':
        return <FontAwesomeIcon icon={faCar} />;
      case 'wholefoods':
        return <FontAwesomeIcon icon={faShoppingBag} />;
      default:
        return <FontAwesomeIcon icon={faCreditCard} />;
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
        <div className="left-column">
          {/* Card Balance */}
          <div className="summary-card card-balance">
            <h3>Card Balance</h3>
            <div className="amount">${data.user.cardBalance.toFixed(2)}</div>
            <div className="available">${data.user.availableBalance.toFixed(2)} Available</div>
          </div>

          {/* Daily Points */}
          <div className="summary-card daily-points">
            <h3>Daily Points</h3>
            <div className="points-container">
              <div className="points">{dailyPoints.formattedPoints}</div>
              <button className="points-button">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </div>
        </div>

        {/* No Payment Due */}
        <div className="summary-card no-payment">
          <h3>No Payment Due</h3>
          <div className="message">{data.user.paymentStatus}</div>
          <button className="payment-button">
            <FontAwesomeIcon icon={faCheck} />
          </button>
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
              onClick={() => onTransactionClick(transaction)}
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
                <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
