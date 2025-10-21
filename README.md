# Wallet Test App

A React.js + TypeScript mobile wallet application with transaction management and daily points calculation.

## Features

- **TransactionsList Screen**: Displays card balance, daily points, and latest transactions
- **TransactionDetail Screen**: Shows detailed information for individual transactions
- **Daily Points Calculation**: Implements the season-based points algorithm
- **Mobile-Responsive Design**: Optimized for mobile devices
- **FontAwesome Icons**: Uses FontAwesome for consistent iconography

## Technical Requirements Met

- ✅ Built with React.js and TypeScript
- ✅ Test data stored in JSON file
- ✅ FontAwesome icons implemented
- ✅ Mobile layout only
- ✅ Two main screens: TransactionsList and TransactionDetail
- ✅ Card balance with limit and available balance
- ✅ Daily points calculation with season-based algorithm
- ✅ Transaction list with proper formatting
- ✅ Transaction detail screen with all information

## Daily Points Algorithm

The app implements a sophisticated daily points calculation system:

- **Day 1 of season**: 2 points
- **Day 2 of season**: 3 points  
- **Day 3+ of season**: 100% of day-2 points + 60% of day-1 points
- **Formatting**: Points > 1000 are displayed in "K" format

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── TransactionsList.tsx
│   ├── TransactionsList.css
│   ├── TransactionDetail.tsx
│   └── TransactionDetail.css
├── utils/
│   └── dailyPoints.ts
├── types.ts
├── data.json
├── App.tsx
└── App.css
```

## Screenshots

The application includes two main screens:

1. **TransactionsList**: Shows card balance, daily points, and transaction history
2. **TransactionDetail**: Displays detailed transaction information when clicked

## Data Structure

The app uses a JSON file (`src/data.json`) containing:
- User information (card balance, limits)
- Transaction history with all required fields
- Proper date formatting and status handling