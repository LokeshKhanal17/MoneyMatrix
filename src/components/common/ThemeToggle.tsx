import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-1 right-8 p-3 m-2 rounded-full bg-gray-200 dark:bg-gray-300 shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {theme === 'light' ? (
        <SunIcon className="h-6 w-6 text-yellow-600" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
