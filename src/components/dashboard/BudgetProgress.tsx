import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@headlessui/react';
import { useTheme } from '../../context/ThemeContext';

interface BudgetProgressProps {
  expensePercentage: number;
  savingPercentage: number;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({
  expensePercentage = 78,
  savingPercentage = 65,
}) => {
  const [isSavingsMode, setIsSavingsMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();

  const circumference = 2 * Math.PI * 120;
  const currentPercentage = isSavingsMode ? savingPercentage : expensePercentage;
  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference;

  const isDark = 'light' ;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl p-8 transition-all duration-300">
        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full flex items-center space-x-2 transition-colors duration-200">
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !isSavingsMode 
                  ? 'bg-white dark:bg-gray-600 text-pink-600 dark:text-pink-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => setIsSavingsMode(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Expenses
            </motion.button>

            <Switch
              checked={isSavingsMode}
              onChange={setIsSavingsMode}
              className={`${
                isSavingsMode 
                  ? 'bg-emerald-400 dark:bg-emerald-600' 
                  : 'bg-pink-400 dark:bg-pink-600'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
            >
              <span 
                className={`${
                  isSavingsMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
              />
            </Switch>

            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isSavingsMode 
                  ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => setIsSavingsMode(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Savings
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Circle Progress with Text */}
          <div 
            className="relative w-64 h-64"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Progress Circles */}
            <svg
              className="transform -rotate-90 w-full h-full absolute"
              viewBox="0 0 256 256"
            >
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={isDark ? '#F87171' : '#FB7185'} />
                  <stop offset="100%" stopColor={isDark ? '#EF4444' : '#F43F5E'} />
                </linearGradient>
                <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={isDark ? '#34D399' : '#10B981'} />
                  <stop offset="100%" stopColor={isDark ? '#059669' : '#047857'} />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke={isDark ? '#374151' : '#E5E7EB'}
                strokeWidth="12"
                fill="none"
                className="transition-all duration-300"
              />

              {/* Main progress */}
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                stroke={isSavingsMode ? "url(#savingsGradient)" : "url(#expenseGradient)"}
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="drop-shadow-lg transition-all duration-300"
              />
            </svg>

            {/* Text Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="text-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`text-2xl font-bold mb-2 ${
                    isSavingsMode 
                      ? 'text-emerald-500 dark:text-emerald-400'
                      : 'text-pink-500 dark:text-pink-400'
                  } transition-colors duration-200`}
                >
                  {isSavingsMode ? 'SAVINGS' : 'BUDGET'}
                </motion.div>
                <motion.div
                  className={`text-5xl font-bold ${
                    isSavingsMode 
                      ? 'text-emerald-600 dark:text-emerald-300'
                      : 'text-pink-600 dark:text-pink-300'
                  } transition-colors duration-200`}
                >
                  {currentPercentage}%
                </motion.div>

                {/* Hover info */}
                <AnimatePresence>
                  {isHovering && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium ${
                        isSavingsMode 
                          ? 'text-emerald-500 dark:text-emerald-400'
                          : 'text-pink-500 dark:text-pink-400'
                      } transition-colors duration-200`}
                    >
                      {isSavingsMode ? 'Total Savings' : 'Total Expenses'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-medium ${
                isSavingsMode 
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-pink-600 dark:text-pink-400'
              } transition-colors duration-200`}>
                Monthly {isSavingsMode ? 'Savings' : 'Expenses'}
              </h3>
              <motion.button
                className={`relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isSavingsMode 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                } transition-colors duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Track Now
              </motion.button>
            </div>

            <div className="grid grid-cols-6 gap-4">
              {['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month, index) => (
                <div key={month} className="flex flex-col items-center">
                  <div className="relative w-4 h-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-200">
                    <motion.div 
                      className={`w-full absolute bottom-0 rounded-full ${
                        isSavingsMode 
                          ? 'bg-emerald-400 dark:bg-emerald-500'
                          : 'bg-pink-400 dark:bg-pink-500'
                      } transition-colors duration-200`}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.random() * 60 + 40}%` }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 1,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    isSavingsMode 
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-pink-600 dark:text-pink-400'
                  } transition-colors duration-200`}>
                    {month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;