import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateRandomData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    month,
    expenses: Math.floor(Math.random() * 8000) + 2000,
    savings: Math.floor(Math.random() * 5000) + 1000,
  }));
};

const AnimatedBarChart: React.FC = () => {
  const [chartData, setChartData] = useState(generateRandomData());
  const [key, setKey] = useState(0); // Key to force chart re-render

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate new data
      const newData = generateRandomData();
      
      // Animate out
      setChartData([]);
      
      // Brief timeout before animating in new data
      setTimeout(() => {
        setChartData(newData);
        setKey(prev => prev + 1);
      }, 100);
      
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1,type: 'spring', stiffness: 120 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} key={key}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis 
                dataKey="month"
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar
                dataKey="expenses"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={0}
              >
                {chartData.map((entry, index) => (
                  <motion.rect
                    key={`expenses-${index}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="savings"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={200}
              >
                {chartData.map((entry, index) => (
                  <motion.rect
                    key={`savings-${index}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.5 + index ,
                      delay: 0.2 + index * 0.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center items-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
            <span className="text-sm text-gray-600">Savings</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedBarChart;