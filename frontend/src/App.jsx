import { Routes, Route } from "react-router-dom"
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ForgotPassPage } from "./pages/ForgotPassPage";
import './App.css'
import VerifyEmail from "./Components/AuthComponent/VerifyEmail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/register' element={<RegistrationPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/forgetpassword' element={<ForgotPassPage />} />
      <Route path='/VerifyEmail' element={<VerifyEmail />} />
    </Routes>
  )
}

export default App;
