import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.component'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AtuhPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Routes>
      <Route path="/" element={<Navbar/>}>
        <Route path="singin" element={<AuthPage type = "Sing-In"/>} />
        <Route path="singup" element={<AuthPage type= "Sing-Up"/>} />
      </Route>
    </Routes>
  )
}

export default App
