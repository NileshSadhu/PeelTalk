import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/AuthComponents/PublicRoute";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { VerificationPage } from "./pages/VerificationPage";
import { PrivateRoute } from "./components/AuthComponents/PrivateRoute";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path='/forgotpassword' element={<ForgetPasswordPage />} />
        <Route path='/resetpassword/:email' element={ <ResetPasswordPage/> } />
        <Route path='/verification/:email' element={<VerificationPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;