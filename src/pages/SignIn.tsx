import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChartPieIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signInSchema, type SignInInputs } from '../validations/auth.schema';
import Navbar from '../components/dashboard/Navbar';



const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = async (data: SignInInputs) => {
    setIsLoading(true);
    try {
      // Add authentication logic here
      console.log(data);
    } catch (err) {
      setError('root', { message: 'Invalid credentials' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center lg:m-24 rounded-lg shadow-md min-h-screen">
    <Navbar/>
    <div className="w-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left side - Sign in form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md space-y-8">
            <div className='flex justify-center gap-4'>
                <ChartPieIcon className="h-10 w-10 text-blue-600" />
                <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-gray-200">
                Hello, Welcome Back!{' username'}
                </h2>
            </div>

            <div className="mt-8">
                <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <FcGoogle className="h-5 w-5 mr-2" />
                    Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <FaGithub className="h-5 w-5 mr-2" />
                    GitHub
                </button>
                </div>

                <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
                </div>
            </div>

            <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email address
                    </label>
                    <div className="mt-1">
                    <input
                        {...register('email')}
                        type="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password
                    </label>
                    <div className="mt-1 relative">
                    <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <input
                        {...register('rememberMe')}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                        Remember me
                    </label>
                    </div>

                    <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot your password?
                    </Link>
                    </div>
                </div>

                <div>
                    <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={isLoading}
                    >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                    </motion.button>
                </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign up now
                </Link>
                </p>
            </div>
            </div>
        </div>

        {/* Right side - Animation section */}
        <div className="hidden lg:block relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 lg:m-4">
            <div className="absolute inset-0 overflow-hidden">
            {/* Floating Cards Container */}
            <div className="absolute inset-0 flex items-center justify-center rounded-lg ">
                <motion.div
                className="flex flex-col gap-6 w-[400px]"
                animate={{ y: [-800, 800] }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                >
                {[...Array(6)].map((_, index) => (
                    <React.Fragment key={index}>
                    {/* Growth Card */}
                    <motion.div 
                        className="bg-white rounded-2xl p-8 shadow-lg lg:rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-gray-500 font-medium mb-2 text-lg">GROWTH</h3>
                        <div className="text-5xl font-bold text-gray-900 mb-2">+21.35%</div>
                        <p className="text-gray-600 text-sm">
                        This significant increase in growth highlights the effectiveness of our recent strategies.
                        </p>
                        <div className="mt-4 h-[120px] relative">
                        <svg className="w-full h-full" viewBox="0 0 400 120">
                            <motion.path
                            d="M 0,60 C 100,60 150,20 200,80 S 300,40 400,90"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            />
                        </svg>
                        </div>
                    </motion.div>

                    {/* Engagement Card */}
                    <motion.div 
                        className="bg-white rounded-2xl p-8 shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 className="text-gray-500 font-medium mb-2 text-lg">ENGAGEMENT</h3>
                        <div className="text-5xl font-bold text-gray-900 mb-2">+78.12%</div>
                        <p className="text-gray-600 text-sm">
                        Significant increase in engagement rate from our latest content strategy.
                        </p>
                        <div className="mt-4 flex items-end justify-between h-[120px] gap-2">
                        {[65, 85, 45, 75, 55, 90].map((height, i) => (
                            <motion.div
                            key={i}
                            className="w-8 bg-blue-500 rounded-t-lg"
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{
                                duration: 1,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatType: "reverse",
                                repeatDelay: 1
                            }}
                            />
                        ))}
                        </div>
                    </motion.div>
                    </React.Fragment>
                ))}
                </motion.div>
            </div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue-100 to-transparent" />
        </div>
    </div>
    </div>
  );
};

export default SignIn;