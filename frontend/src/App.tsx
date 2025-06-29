import { Routes, Route, useNavigate } from "react-router-dom";
import { PublicRoute } from "./components/AuthComponents/PublicRoute";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { VerificationPage } from "./pages/VerificationPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { ChatAccessLoader } from "./components/ChatComponents/ChatAccessLoader";
import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";


function App() {
  const navigate = useNavigate();
  const { fetchUser } = useUserStore.getState();

  useEffect(() => {
    const loadUser = async () => {
        const result = await fetchUser();
        if (result?.redirectToSignIn) {
            navigate("/signIn");
        }
    };
    loadUser();
}, []);


  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path='/forgotpassword' element={<ForgetPasswordPage />} />
        <Route path='/resetpassword/:email' element={ <ResetPasswordPage/> } />
        <Route path='/verification/:email' element={<VerificationPage />} />
      </Route>

        <Route path="/" element={<ChatAccessLoader><HomePage /></ChatAccessLoader>} />
        <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;

