import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ForgotPassPage } from "./pages/ForgotPassPage";
import VerifyEmail from "./Components/AuthComponent/VerifyEmail";
import './App.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/HomePage');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgetpassword" element={<ForgotPassPage />} />
      <Route path="/VerifyEmail" element={<VerifyEmail />} />
      <Route path="/HomePage" element={<HomePage />} />
    </Routes>
  );
}

export default App;
