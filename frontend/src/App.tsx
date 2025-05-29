import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { ForgotPass } from "./pages/ForgotPass"
import { VerifyResetPassword } from "./pages/VerifyResetPassword"
import { VerifySignup } from "./pages/VerifySignup"
import { HomePage } from "./pages/HomePage"
import { Profile } from "./pages/Profile"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgotpassword" element={<ForgotPass/>}/>
        <Route path="/resetpassword/:email" element={<VerifyResetPassword/>}/>
        <Route path="/verifySignup/:email" element={<VerifySignup/>}/>


        <Route path="/" element={<HomePage/>}/>
        <Route path="/profile" element={<Profile/>  }/>
      </Routes>
    </>
  )
}

export default App
