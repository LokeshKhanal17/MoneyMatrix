import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Search, Bell, Copy, MessageSquare,
  ChevronDown, ArrowUp, ArrowDown 
} from 'lucide-react';

// Animation variants
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  scale: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  }
};

const Dashboard = () => {
  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', income: 12000, expenses: 5800 },
    { month: 'Feb', income: 13500, expenses: 6200 },
    { month: 'Mar', income: 14200, expenses: 5900 },
    { month: 'Apr', income: 13800, expenses: 6100 },
    { month: 'May', income: 15000, expenses: 6300 },
    { month: 'Jun', income: 14500, expenses: 6000 },
    { month: 'Jul', income: 16281, expenses: 6638 }
  ];

  // Navigation items
  const navItems = ['Overview', 'Wallet', 'Analytics', 'Transaction', 'Help', 'Settings', 'Report'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <motion.nav 
        className="bg-white shadow-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-8">
              <motion.span 
                className="text-xl font-bold text-green-700"
                whileHover={{ scale: 1.05 }}
              >
                MoneyMatrix
              </motion.span>
              
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ opacity: 0.8 }}
              >
                Personal account
                <ChevronDown className="h-4 w-4" />
              </motion.div>

              <div className="px-4 py-1 rounded bg-gray-100">
                Dashboard
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <motion.div className="flex items-center space-x-4" {...animations.scale}>
                <MessageSquare className="h-5 w-5 cursor-pointer" />
                <Bell className="h-5 w-5 cursor-pointer" />
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                    JB
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          {...animations.fadeInUp}
        >
          <div>
            <h1 className="text-2xl font-semibold">Good morning, Jaylon</h1>
            <p className="text-gray-500">This is your finance report</p>
          </div>
          
          <div className="flex space-x-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                className="text-gray-600 hover:text-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Finance Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <motion.div 
            className="bg-white rounded-lg p-6 shadow-sm"
            {...animations.fadeInUp}
            whileHover={{ y: -4 }}
          >
            <div className="mb-4">
              <h2 className="text-gray-600 mb-2">My balance</h2>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">$83,172</span>
                <span className="text-sm text-gray-400">.64</span>
                <span className="text-green-500 text-sm flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  6.7%
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <code className="text-sm">6549 7329 9821 2472</code>
              <motion.button 
                className="p-1 hover:text-green-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Copy className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="flex space-x-4">
              <motion.button 
                className="px-4 py-2 bg-green-600 text-white rounded-md flex-1 hover:bg-green-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send money
              </motion.button>
              <motion.button 
                className="px-4 py-2 border border-green-600 text-green-600 rounded-md flex-1 hover:bg-green-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request money
              </motion.button>
            </div>
          </motion.div>

          {/* Income Card */}
          <motion.div 
            className="bg-white rounded-lg p-6 shadow-sm"
            {...animations.fadeInUp}
            whileHover={{ y: -4 }}
          >
            <h2 className="text-gray-600 mb-4">Monthly income</h2>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-3xl font-bold">$16,281</span>
              <span className="text-sm text-gray-400">.48</span>
            </div>
            <div className="text-green-500 text-sm flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              9.8% compared to last month
            </div>
          </motion.div>

          {/* Expenses Card */}
          <motion.div 
            className="bg-white rounded-lg p-6 shadow-sm"
            {...animations.fadeInUp}
            whileHover={{ y: -4 }}
          >
            <h2 className="text-gray-600 mb-4">Monthly expenses</h2>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-3xl font-bold">$6,638</span>
              <span className="text-sm text-gray-400">.72</span>
            </div>
            <div className="text-red-500 text-sm flex items-center">
              <ArrowDown className="h-4 w-4 mr-1" />
              8.6% compared to last month
            </div>
          </motion.div>
        </div>

        {/* Chart */}
        <motion.div 
          className="bg-white rounded-lg p-6 shadow-sm"
          {...animations.fadeInUp}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Statistics</h2>
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                Total income
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2" />
                Total expenses
              </span>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#22C55E" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#F97316" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;