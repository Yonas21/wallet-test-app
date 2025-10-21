export interface Transaction {
  id: number;
  type: 'Credit' | 'Payment';
  amount: number;
  name: string;
  description: string;
  date: string;
  time: string;
  status: 'Pending' | 'Completed';
  authorizedBy: string | null;
  location: string;
  cashback: number;
  icon: string;
}

export interface User {
  cardLimit: number;
  cardBalance: number;
  availableBalance: number;
  paymentStatus: string;
}

export interface AppData {
  user: User;
  transactions: Transaction[];
}

export interface DailyPoints {
  points: number;
  formattedPoints: string;
}
