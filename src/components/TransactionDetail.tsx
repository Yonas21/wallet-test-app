import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Transaction } from '../types';
import './TransactionDetail.css';

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction, onBack }) => {
  const formatAmount = (amount: number, type: string): string => {
    const prefix = type === 'Payment' ? '+' : '';
    return `${prefix}$${amount.toFixed(2)}`;
  };

  const formatDateTime = (date: string, time: string): string => {
    const transactionDate = new Date(`${date}T${time}`);
    return transactionDate.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    }) + ', ' + transactionDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
  };

  // Removed unused getTransactionIcon function

  return (
    <div className="transaction-detail">
      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      {/* Transaction Amount */}
      <div className="transaction-amount-large">
        {formatAmount(transaction.amount, transaction.type)}
      </div>

      {/* Transaction Info */}
      <div className="transaction-info">
        <div className="merchant-name">{transaction.name}</div>
        <div className="transaction-date-time">
          {formatDateTime(transaction.date, transaction.time)}
        </div>
      </div>

      {/* Transaction Details Card */}
      <div className="details-card">
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span className="detail-value status-approved">
            <FontAwesomeIcon icon={faCheck} />
            Approved
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-value">{transaction.description}</span>
        </div>
        <div className="detail-row total-row">
          <span className="detail-label">Total</span>
          <span className="detail-value total-amount">
            {formatAmount(transaction.amount, transaction.type)}
          </span>
        </div>
      </div>

    </div>
  );
};

export default TransactionDetail;
