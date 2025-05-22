import './App.css'
import Login from './Components/AuthPages/Login';
import Register from './Components/AuthPages/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-riuter-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='./Components/AuthPage/Register' element={<Register />} />
        <Route path='./Components/AuthPage/Login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
