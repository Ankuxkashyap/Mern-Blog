import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar.component';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AtuhPage'; // typo fixed here too

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="singin" element={<AuthPage type="Sign-In" />} />
        <Route path="singup" element={<AuthPage type="Sign-Up" />} />
      </Route>
    </Routes>
  );
}

export default App;
