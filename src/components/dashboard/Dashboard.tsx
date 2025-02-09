import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Sun, Moon, BarChart2, Settings, CreditCard,
  Users, TrendingUp, Bell, ChevronDown,
} from 'lucide-react';
import LogoFetcher from './LogoFetcher';

// Types
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}



interface TransactionType {
  name: string;
  date: string;
  status: string;
  type: string;
  amount: number;
}

// Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom Hooks
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const useCounter = (end: number, duration: number = 2000): string => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count.toFixed(2);
};

// Theme Provider Component
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Component for animated sections
const AnimatedSection: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const balanceAmount = useCounter(32440.99);
  const availableAmount = useCounter(124040.00);
  const creditLimit = useCounter(520490.00);

  // Sample data
  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', active: true },
    { icon: CreditCard, label: 'Smart Expense' },
    { icon: TrendingUp, label: 'Analytics' },
    { icon: Users, label: 'Shared Expenses' },
    { icon: Settings, label: 'Settings' }
  ];

  const statisticsData = [
    { month: 'Jan', income: 4000, expenses: 2400 },
    { month: 'Feb', income: 5000, expenses: 3200 },
    { month: 'Mar', income: 6000, expenses: 4800 },
    { month: 'Apr', income: 7000, expenses: 3800 },
    { month: 'May', income: 5500, expenses: 2900 },
    { month: 'Jun', income: 8000, expenses: 3500 }
  ];


  const transactions: TransactionType[] = [
    { 
      name: 'Adobe',
      date: '12 Mar, 11:28 AM',
      status: 'Completed',
      type: 'Subscription',
      amount: -35.00 
    },
    { 
      name: 'Walmart',
      date: '09 Mar, 09:22 AM',
      status: 'Completed',
      type: 'Food',
      amount: -120.00 
    },
    { 
      name: 'Adidas',
      date: '02 Mar, 10:32 AM',
      status: 'Completed',
      type: 'Shopping',
      amount: -890.00
    },
    {
      name: 'Google',
      date: '25 Feb, 08:45 AM',
      status: 'Completed',
      type: 'Subscription',
      amount: -99.00

    },
    {
      name: 'Apple',
      date: '18 Feb, 12:00 PM',
      status: 'Completed',
      type: 'Subscription',
      amount: -14.99
    },
    {
      name: 'Amazon',
      date: '10 Feb, 09:00 AM',
      status: 'Completed',
      type: 'Shopping',
      amount: -250.00
    },
    {
      name: 'Netflix',
      date: '03 Feb, 11:00 AM',
      status: 'Completed',
      type: 'Subscription',
      amount: -15
    }

  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div 
          className="fixed inset-0 bg-black flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-green-500 text-4xl font-bold"
          >
            MoneyMatrix
          </motion.div>
        </motion.div>
      ) : (
        <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'} transition-colors duration-200`}>
          {/* Header */}
          <motion.header 
            className={`fixed w-full ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} 
              border-b z-10 transition-colors duration-200`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-8">
                <motion.h1 
                  className="text-xl font-bold text-green-500"
                  whileHover={{ scale: 1.05 }}
                >
                  MoneyMatrix
                </motion.h1>
                <nav className="flex space-x-6">
                  <button className={isDarkMode ? 'text-green-500' : 'text-green-600'}>Dashboard</button>
                  <button className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Accounts</button>
                  <button className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Cards</button>
                  <button className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Analytics</button>
                </nav>
              </div>

              <div className="flex items-center space-x-6">
                <motion.button 
                  className={`p-2 rounded-full ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  } transition-colors duration-200`}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? (
                    <Sun className="text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Moon className="text-gray-600 hover:text-gray-700" />
                  )}
                </motion.button>
                <Bell className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <motion.div 
                  className="flex items-center space-x-2" 
                  whileHover={{ scale: 1.05 }}
                >
                  <LogoFetcher name="Emma" className="w-8 h-8 rounded-full" alt="Emma Parson" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Emma Parson
                  </span>
                  <ChevronDown className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </motion.div>
              </div>
            </div>
          </motion.header>

          <div className="pt-16 flex">
            {/* Sidebar */}
            <motion.aside 
              className={`fixed left-0 h-full w-64 ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-800' 
                  : 'bg-white border-gray-200'
              } border-r transition-colors duration-200`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <nav className="p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={index}
                    className={`
                      flex items-center w-full p-3 rounded-lg
                      ${item.active 
                        ? 'bg-green-500/10 text-green-500' 
                        : isDarkMode
                          ? 'text-gray-400 hover:bg-gray-800'
                          : 'text-gray-600 hover:bg-gray-100'
                      }
                      transition-colors duration-200
                    `}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-6">
              {/* Balance Card */}
              <AnimatedSection>
                <motion.div 
                  className={`mb-6 p-6 rounded-xl ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  } transition-colors duration-200`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Balance</p>
                      <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${balanceAmount}
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Available to spend: ${availableAmount}
                    </p>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Credit limit: ${creditLimit}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* Statistics */}
              <AnimatedSection>
                <motion.div 
                  className={`p-6 rounded-xl ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  } mb-6 transition-colors duration-200`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-xl font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Statistics</h2>
                    <select className={`bg-transparent ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } border-none`}>
                      <option>Last Year</option>
                      <option>Last Month</option>
                    </select>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={statisticsData}>
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke={isDarkMode ? '#2D3748' : '#E2E8F0'} 
                        />
                        <XAxis 
                          dataKey="month" 
                          stroke={isDarkMode ? '#718096' : '#4A5568'} 
                        />
                        <YAxis 
                          stroke={isDarkMode ? '#718096' : '#4A5568'} 
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: isDarkMode ? '#1A202C' : '#FFFFFF',
                            border: 'none',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="income" 
                          stroke="#48BB78" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="#F56565" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* Transactions */}
              <AnimatedSection>
                <motion.div 
                  className={`p-6 rounded-xl ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  } transition-colors duration-200`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-xl font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Transactions</h2>
                    <button className={isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>
                      View All
                    </button>
                  </div>
                  <motion.div 
                    className="space-y-4"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {transactions.map((transaction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <LogoFetcher name={transaction.name} className="w-12 h-12 rounded-full" alt={transaction.name} />
                          <div>
                            <h3 className={`font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{transaction.name}</h3>
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${
                            transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                          </p>
                          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            {transaction.type}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            </main>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// App Component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;