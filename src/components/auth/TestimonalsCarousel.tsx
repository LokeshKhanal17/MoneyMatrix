import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  content: string;
  author: string;
  role: string;
  image: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentTestimonialIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-white rounded-lg p-8 shadow-lg"
        >
          <div className="flex items-center">
            <img
              src={testimonials[currentTestimonialIndex].image}
              alt={testimonials[currentTestimonialIndex].author}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-900">
                {testimonials[currentTestimonialIndex].author}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[currentTestimonialIndex].role}
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            {testimonials[currentTestimonialIndex].content}
          </p>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentTestimonialIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialCarousel;