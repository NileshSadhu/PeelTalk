import { Routes, Route } from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage"
import { HomePage } from "./pages/HomePage"
import { RegistrationPage } from './pages/RegistrationPage';
import { ForgotPassPage } from './pages/ForgotPassPage';
import { VerifyEmailPage } from "./pages/VerifyEmailPage"
import { PrivateRoute } from './Components/AuthComponent/PrivateRoute';
import { PublicRoute } from './Components/AuthComponent/PublicRoute';

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute/>}>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegistrationPage />} />
      </Route>

      <Route element={<PrivateRoute/>}>
      <Route path="/" element={<HomePage />} />
      <Route path='/forgetpass' element={<ForgotPassPage />} />
      <Route path='/verifyemail/:email' element={<VerifyEmailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
