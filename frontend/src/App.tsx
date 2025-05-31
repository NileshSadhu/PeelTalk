import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/AuthComponents/PublicRoute";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { VerificationPage } from "./pages/VerificationPage";
import { Loading } from "./components/Common/Loading";
import { PrivateRoute } from "./components/AuthComponents/PrivateRoute";
import { HomePage } from "./pages/HomePage";
import { Profile } from "./components/ProfileComponents/Profile";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path='/forgotpassword' element={<ForgetPasswordPage />} />
        {/* <Route path='/checkpin/:email' element={<CheckPinPage />} /> */}
        <Route path='/verification/:email' element={<VerificationPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;