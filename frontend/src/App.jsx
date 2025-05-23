import './App.css'
import ForgetPass from './Components/AuthPages/ForgetPass';
import Login from './Components/AuthPages/Login';
import Register from './Components/AuthPages/Register';
import Home from './Home'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgetpassword' element={<ForgetPass />} />
    </Routes>
  )
}

export default App;
