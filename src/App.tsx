import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AnimatedRoutes from './components/auth/AnimatedRoutes';


const App: React.FC = () => {

 
  return (
    <ThemeProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;

