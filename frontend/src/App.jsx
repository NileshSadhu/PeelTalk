import { Routes, Route } from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage"
import { HomePage } from "./pages/HomePage"
import { RegistrationPage } from './pages/RegistrationPage';
import { ForgotPassPage } from './pages/ForgotPassPage';
import { VerifyEmailPage } from "./pages/VerifyEmailPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path='/forgetpass' element={<ForgotPassPage />} />
      <Route path='/verifyemail/:email' element={<VerifyEmailPage />} />
    </Routes>
  );
}

export default App;
