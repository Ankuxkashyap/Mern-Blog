import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar.component';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AtuhPage'; 
import  { Toaster } from 'react-hot-toast';
import Editer from './pages/Editer';
import { PreviewBlog } from './components/previewBlog.component';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
       <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="singin" element={<AuthPage type="Sign-In" />} />
        <Route path="singup" element={<AuthPage type="Sign-Up" />} />
      </Route>
      <Route path="/editer" element={<Editer/>}/>
      <Route path='/preview' element = {<PreviewBlog/>}/>
    </Routes>
    </>
  );
}

export default App;
