import { Routes, Route, useNavigate } from "react-router-dom";
import { PublicRoute } from "./components/AuthComponents/PublicRoute";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { VerificationPage } from "./pages/VerificationPage";
import { ChatRoomPage } from "./pages/ChatRoomPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { ChatAccessLoader } from "./components/ChatComponents/ChatAccessLoader";
import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";
import { PrivateRoute } from "./components/AuthComponents/PrivateRoute";
import { HomePage } from "./pages/HomePage";
import { GroupChatPage } from "./pages/GroupChatPage";
import { Home } from "./components/HomeComponents/Home";

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
        <Route path="/forgotpassword" element={<ForgetPasswordPage />} />
        <Route path="/resetpassword/:email" element={<ResetPasswordPage />} />
        <Route path="/verification/:email" element={<VerificationPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Home />} />
      </Route>

      <Route
        path="/chat"
        element={
          <ChatAccessLoader>
            <ChatRoomPage />
          </ChatAccessLoader>
        }
      />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/groupchat" element={<GroupChatPage />} />
      </Route>
    </Routes>
  );
}

export default App;
