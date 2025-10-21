import React from 'react';
import { Transaction } from '../types';
import './TransactionDetail.css';

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction, onBack }) => {
  console.log('TransactionDetail rendered with:', transaction);
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
          ←
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
            ✓ Approved
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Payment Method:</span>
          <span className="detail-value">RBC Bank Debit Card</span>
        </div>
        <div className="detail-row total-row">
          <span className="detail-label">Total</span>
          <span className="detail-value total-amount">
            {formatAmount(transaction.amount, transaction.type)}
          </span>
        </div>
      </div>

      {/* Additional Details */}
      <div className="additional-details">
        <div className="detail-section">
          <h4>Transaction Details</h4>
          <div className="detail-item">
            <span>Merchant:</span>
            <span>{transaction.name}</span>
          </div>
          <div className="detail-item">
            <span>Location:</span>
            <span>{transaction.location}</span>
          </div>
          <div className="detail-item">
            <span>Description:</span>
            <span>{transaction.description}</span>
          </div>
          {transaction.authorizedBy && (
            <div className="detail-item">
              <span>Authorized By:</span>
              <span>{transaction.authorizedBy}</span>
            </div>
          )}
          {transaction.cashback > 0 && (
            <div className="detail-item">
              <span>Cashback:</span>
              <span>{transaction.cashback}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
