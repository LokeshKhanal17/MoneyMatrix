import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppStoreIos, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import {
  ChartPieIcon,
  ArrowSmallRightIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  BanknotesIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
//import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/dashboard/Navbar';
import BudgetProgress from '../components/dashboard/BudgetProgress';

const features = [
  {
    title: 'Smart Expense Tracking',
    description: 'Automatically categorize your expenses and get insights into your spending patterns.',
    icon: ChartBarIcon,
    image: 'https://i.pinimg.com/474x/c6/7a/2e/c67a2e86f907c819753429529c64307c.jpg',
  },
  {
    title: 'Shared Expenses Management',
    description: 'Split bills with roommates or friends effortlessly and track who owes what.',
    icon: UserGroupIcon,
    image: 'https://i.pinimg.com/736x/2c/de/f0/2cdef0a1d76fd6594fa0db79aa1e4316.jpg',
  },
  {
    title: 'Real-time Budget Updates',
    description: 'Stay on top of your finances with instant notifications and real-time budget tracking.',
    icon: ClockIcon,
    image: 'https://i.pinimg.com/474x/f3/ed/e7/f3ede74360be860ab11d1c4b1e898189.jpg',
  },
  {
    title: 'Secure Financial Data',
    description: 'Bank-level security ensures your financial information stays private and protected.',
    icon: ShieldCheckIcon,
    image: 'https://i.pinimg.com/474x/2c/86/9e/2c869e1f878e0c9146fe9a1f7e1d2a7c.jpg',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Connect Your Accounts',
    description: 'Securely link your bank accounts to automatically import transactions.',
  },
  {
    step: '02',
    title: 'Set Your Budget',
    description: 'Create custom budget categories and set spending limits that work for you.',
  },
  {
    step: '03',
    title: 'Track Progress',
    description: 'Monitor your spending and savings goals with intuitive visualizations.',
  },
  {
    step: '04',
    title: 'Optimize Spending',
    description: 'Get AI-powered insights to help you save more and spend wisely.',
  },
];

const Welcome: React.FC = () => {
 // const { theme } = useTheme();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Navbar />
      {/* Hero Section */}
      <div className="relative pt-8 bg-white dark:bg-gray-800 dark:text-gray-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <ChartPieIcon className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-8" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  Simplify Your Finances
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Track expenses, split bills, and achieve your financial goals with our smart budget planner.
                Take control of your money and make better financial decisions.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                to="/signup" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out transform hover:-translate-y-1"
              >
                Get Started Free
                <ArrowSmallRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

       
        <div className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Hero content */}
            </div>
            <BudgetProgress expensePercentage={90} savingPercentage={10}/>
        </div>
       
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to manage your money
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful features to help you take control of your finances
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
                  <div className="p-8">
                    <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-600">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-gray-50">
              How it works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-100">
              Get started in minutes with these simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.5,type: 'spring',stiffness: 140 }}
              >
                <div className="bg-gray-300 rounded-xl p-8 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Transform your financial life
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join thousands of users who've improved their financial well-being
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: '85%',
                title: 'Users save more',
                description: 'Our users report increased savings within 3 months',
              },
              {
                stat: '15min',
                title: 'Daily time saved',
                description: 'Automated tracking saves you time on money management',
              },
              {
                stat: '50%',
                title: 'Stress reduction',
                description: 'Users report less financial stress and better control',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-gray-50 rounded-xl p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2,type: 'spring',stiffness: 140 }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {benefit.stat}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who are already managing their money better.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-blue-600 bg-white hover:bg-gray-100 transition duration-150 ease-in-out transform hover:-translate-y-1"
            >
              Get Started Free
              <ArrowSmallRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-400 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <ChartPieIcon className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">BudgetPlanner</span>
              </div>
              <p className="text-gray-400">
                Making financial management simple and effective for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white">Testimonials</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#careers" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#privacy" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#terms" className="text-gray-400 hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">support@budgetplanner.com</li>
                <li className="text-gray-400">1-800-BUDGET</li>
                <li className="text-gray-400">123 Finance Street</li>
                <li className="text-gray-400">New York, NY 10001</li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  {/* Add Facebook Icon */}
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  {/* Add Twitter Icon */}
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  {/* Add Instagram Icon */}
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  {/* Add LinkedIn Icon */}
                </a>
              </div>
            </div>
          </div>

          {/* App Store Badges */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Download our mobile app</h3>
                <div className="flex space-x-4">
                  <a href="#" className="block">
                    <FontAwesomeIcon icon={faAppStoreIos} />
                  </a>
                  <a href="#" className="block">
                    <FontAwesomeIcon icon={faGooglePlay} />
                  </a>
                </div>
              </div>
              
              {/* Newsletter Signup */}
            <div className="flex flex-col md:flex-row items-center gap-4 p-5 bg-gray-100 rounded-lg shadow-md">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="p-4 w-full md:w-auto flex-grow rounded-lg border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                />
                <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
                >
                    Sign Up
                </button>
            </div>

            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 BudgetPlanner. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Cookie Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Accessibility
                </a>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <motion.div
              className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg flex items-center transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <ShieldCheckIcon className="h-6 w-6 text-green-400 mr-2" />
              <span className="text-sm text-gray-300 dark:text-gray-200">256-bit SSL Encryption</span>
            </motion.div>
            <motion.div
              className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg flex items-center transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <CurrencyDollarIcon className="h-6 w-6 text-green-400 mr-2" />
              <span className="text-sm text-gray-300 dark">Bank-Level Security</span>
            </motion.div>
            <motion.div
              className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg flex items-center transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <BanknotesIcon className="h-6 w-6 text-green-400 mr-2" />
              <span className="text-sm text-gray-300 dark:text-gray-200">FDIC Insured</span>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default Welcome;