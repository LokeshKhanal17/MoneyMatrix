import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff,  } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: 'gray'
  });

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let message = '';
    let color = 'gray';

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;

    switch (score) {
      case 0:
        message = 'Very Weak';
        color = 'red';
        break;
      case 1:
        message = 'Weak';
        color = 'red';
        break;
      case 2:
        message = 'Fair';
        color = 'yellow';
        break;
      case 3:
        message = 'Good';
        color = 'green';
        break;
      case 4:
      case 5:
        message = 'Strong';
        color = 'green';
        break;
    }

    setPasswordStrength({ score, message, color });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center ">
      <div className="w-full max-w-[1400px] bg-white rounded-[2rem] flex shadow-xl overflow-hidden">
        {/* Left Section - Form */}
        <div className="w-[45%] p-8">
          {/* Header navigation */}
          <div className="flex justify-between items-center mb-8">
            <button className="p-2 hover:bg-gray-100 rounded-full" 
            onClick={
                () => {
                    window.location.href = '/';
                }
            }>
              <ArrowLeft size={24}  />
            </button>
          </div>

          <div className="max-w-md mx-auto">
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">$</span>
              </div>
              <h1 className="text-2xl font-semibold mb-2">Choose Your Reality</h1>
              <p className="text-gray-600">Take control of your financial destiny</p>
            </motion.div>

            {/* Social Login */}
            <div className="flex gap-4 justify-center mb-6">
              <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <FcGoogle size={24} />
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <FaGithub size={24} />
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Main Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className={`text-${passwordStrength.color}-500 text-sm`}>
                      {passwordStrength.message}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className={`h-1 w-1/4 rounded-full ${
                        index <= passwordStrength.score 
                          ? `bg-${passwordStrength.color}-500` 
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Take the Blue Pill
              </button>

              <p className="text-center text-sm text-gray-600">
                Already unplugged from the Matrix?{' '}
                <a href="/signin" className="text-blue-600 font-medium hover:text-blue-700">
                  Signin
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[55%] relative overflow-hidden rounded-l-[2rem]">
          <div className="absolute top-4 right-4 z-10 flex items-center bg-white/90 rounded-full py-1 px-3 gap-2">
            <span className="text-sm">Choose Your Path</span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-full"
          >
            <div className="h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/90" />
              <img 
                src="https://i.pinimg.com/474x/42/fc/df/42fcdf72a1694e1045956abf08043b4b.jpg" 
                alt="Financial Choice"
                className="w-full h-full object-cover"
                style={{ maxHeight: '100vh' }}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-4xl font-bold mb-4">
                The Choice is Yours
              </h2>
              <p className="text-lg text-gray-200 mb-8">
                Take the blue pill to unplug from financial uncertainty. 
                Join Money Matrix and discover the truth about your financial potential.
              </p>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm">Financial Freedom</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-sm">Smart Investing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Wealth Building</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;