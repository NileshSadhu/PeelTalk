import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/AuthComponents/PublicRoute";
import { Home } from "lucide-react";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { VerificationPage } from "./pages/VerificationPage";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/ForgetPassword" element={<ForgetPasswordPage />} />
        <Route path="Verification" element={<VerificationPage />} />
      </Route>
    </Routes>
  );
}

export default App;