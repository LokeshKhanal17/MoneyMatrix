import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, MapPin } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signupSchema, SignupFormData } from '../components/auth/ValidationSchema';
import { z,ZodError } from 'zod';

interface ValidationErrors {
  [key: string]: string[];
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: 'gray'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = async (name: keyof SignupFormData, value: string) => {
    try {
      const partialSchema = z.object({ [name]: signupSchema.shape[name] });
      await partialSchema.parseAsync({ [name]: value });
      
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(prev => ({
          ...prev,
          [name]: error.errors.map(err => err.message)
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    validateField(name as keyof SignupFormData, value);

    if (name === 'password') {
      updatePasswordStrength(value);
    }
  };

  const updatePasswordStrength = (password: string) => {
    let score = 0;
    let message = '';
    let color = 'gray';

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = await signupSchema.parseAsync(formData);
      console.log('Form data is valid:', validatedData);
      
      // Add your API call here
      // await api.signup(validatedData);
      
      // Clear form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        password: ''
      });
      setErrors({});
      
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path) {
            const field = err.path[0] as string;
            if (!newErrors[field]) {
              newErrors[field] = [];
            }
            newErrors[field].push(err.message);
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: keyof SignupFormData) => {
    return errors[fieldName]?.length > 0 ? errors[fieldName][0] : null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-[1400px] bg-white rounded-[2rem] flex shadow-xl overflow-hidden">
        {/* Left Section - Form */}
        <div className="w-[45%] p-8">
          <div className="flex justify-between items-center mb-8">
            <button
            onClick={() => window.location.href = '/'}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-800">
              <ArrowLeft size={24} />
            </button>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-12 h-12 bg-green-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">$</span>
              </div>
              <h1 className="text-2xl font-semibold mb-2 text-gray-700">Choose Your Reality</h1>
              <p className="text-gray-600">Take control of your financial destiny</p>
            </motion.div>

            <div className="flex gap-4 justify-center mb-6">
              <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <FcGoogle size={24} />
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <FaGithub size={24} />
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      getFieldError('firstName') 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-green-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                  {getFieldError('firstName') && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {getFieldError('firstName')}
                    </motion.p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      getFieldError('lastName') 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                  {getFieldError('lastName') && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {getFieldError('lastName')}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('username') 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                />
                {getFieldError('username') && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {getFieldError('username')}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('email') 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                />
                {getFieldError('email') && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {getFieldError('email')}
                  </motion.p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('phone') 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                />
                {getFieldError('phone') && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {getFieldError('phone')}
                  </motion.p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      getFieldError('password') 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent`}
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
                {getFieldError('password') && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {getFieldError('password')}
                  </motion.p>
                )}
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className={`h-1 w-1/4 rounded-full ${
                        index <= passwordStrength.score 
                          ? `bg-${passwordStrength.color}-500` 
                          : 'bg-gray-200'
                      } transition-all duration-300`}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                onClick={()=>{
                    console.log('clicked')
                    //consolelog all the inputs
                    console.log(formData)
                    //window.location.href = '/'
                }}
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className={`w-full py-3 rounded-lg font-medium text-white
                  ${isSubmitting || Object.keys(errors).length > 0
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                  } transition-colors duration-200`}
                whileHover={
                  !isSubmitting && Object.keys(errors).length === 0
                    ? { scale: 1.01 }
                    : {}
                }
                whileTap={
                  !isSubmitting && Object.keys(errors).length === 0
                    ? { scale: 0.99 }
                    : {}
                }
                >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block mr-2"
                    >
                      ↻
                    </motion.span>
                    Processing...
                  </div>
                ) : (
                  'Take the Blue Pill'
                )}
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already unplugged from the Matrix?{' '}
              <a href="/login" className="text-green-600 font-medium hover:text-green-700">
                Login
              </a>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[55%] relative overflow-hidden rounded-l-[2rem]">
          <div className="absolute top-4 right-4 z-10 flex items-center bg-white/90 rounded-full py-1 px-3 gap-2">
            <span className="text-sm text-gray-700">Choose Your Path</span>
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
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
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

export default SignUp;