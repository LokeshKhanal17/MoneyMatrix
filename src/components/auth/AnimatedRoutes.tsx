import Welcome from '../../pages/Welcome';
import SignIn from '../../pages/SignIn';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

// const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Welcome />,
//     },
//     {
//       path: '/signin',
//       element: <SignIn />,
//     },
//   ]);
  

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;