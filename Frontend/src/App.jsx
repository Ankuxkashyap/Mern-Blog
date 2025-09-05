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
import { HomePage } from './pages/HomePage';
import { SerchPage } from "./pages/SerchPage"
import { BsTypeH1 } from 'react-icons/bs';
import { PageNotFound } from './pages/PageNotFound';
import { ProfilePage } from './pages/ProfilePage';

function App() {

  return (
    <>
       <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage/>}/>
        <Route path="singin" element={<AuthPage type="Sign-In" />} />
        <Route path="singup" element={<AuthPage type="Sign-Up" />} />
        <Route path="/serch/:query" element={<SerchPage/>}/>
        <Route path='/user/:id' element={<ProfilePage/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Route>
      <Route path="/editer" element={<Editer/>}/>
      <Route path='/preview' element = {<PreviewBlog/>}/>
    </Routes>
    </>
  );
}

export default App;
