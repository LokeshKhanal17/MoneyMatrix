export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Income {
    id: string;
    userId: string;
    amount: number;
    frequency: 'weekly' | 'biweekly' | 'monthly' | 'yearly';
    source: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Expense {
    id: string;
    userId: string;
    category: ExpenseCategory;
    amount: number;
    description: string;
    date: Date;
    isShared: boolean;
    sharedWith?: string[];
    recurringType?: 'one-time' | 'monthly' | 'yearly';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type ExpenseCategory =
    | 'mortgage'
    | 'utilities'
    | 'groceries'
    | 'insurance'
    | 'investments'
    | 'property_tax'
    | 'phone'
    | 'other';
  
  export interface SavingsGoal {
    id: string;
    userId: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface DashboardData {
    totalIncome: number;
    totalExpenses: number;
    savingsProgress: number;
    expensesByCategory: Record<ExpenseCategory, number>;
    recentTransactions: (Income | Expense)[];
  }