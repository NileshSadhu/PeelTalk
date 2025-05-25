import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ForgotPassPage } from "./pages/ForgotPassPage";
import VerifyEmail from "./Components/AuthComponent/VerifyEmail";
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Only redirect when user is at the root path
    if (location.pathname === "/") {
      if (token) {
        navigate('/HomePage');
      } else {
        navigate('/login');
      }
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgetpassword" element={<ForgotPassPage />} />
      <Route path="/VerifyEmail" element={<VerifyEmail />} />
      <Route path="/HomePage" element={<HomePage />} />
      {/* fallback default to HomePage in case user lands on "/" */}
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
