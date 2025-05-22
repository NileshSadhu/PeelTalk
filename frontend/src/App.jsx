import './App.css'
import Login from './Components/AuthPages/Login';
import Register from './Components/AuthPages/Register';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
      <Routes>
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
  )
}

export default App
