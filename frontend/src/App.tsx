import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/AuthComponents/PublicRoute";
import { Home } from "lucide-react";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { VerificationPage } from "./pages/VerificationPage";
import { Loading } from "./components/Common/Loading";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="verification" element={<VerificationPage />} />
        <Route path="/loading" element={<Loading />} />
      </Route>
    </Routes>
  );
}

export default App;