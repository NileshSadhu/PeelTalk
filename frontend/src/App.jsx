import { Routes, Route } from 'react-router-dom';
import { LoginPage } from "./pages/LoginPage"
import { HomePage } from "./pages/HomePage"
import { RegistrationPage } from './pages/RegistrationPage';
import { ForgotPassPage } from './pages/ForgotPassPage';
import { VerifyEmailPage } from "./pages/VerifyEmailPage"
import { PrivateRoute } from './Components/AuthComponent/PrivateRoute';
import { PublicRoute } from './Components/AuthComponent/PublicRoute';
import { CheckPinPage } from './pages/CheckPinPage';

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path='/forgotpass' element={<ForgotPassPage />} />
        <Route path='/checkpin/:email' element={<CheckPinPage />} />
        <Route path='/verifyemail/:email' element={<VerifyEmailPage />} />
      </Route>
      
      <Route element={<PrivateRoute/>}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
