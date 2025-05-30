import { Routes, Route } from "react-router-dom";
import { SignIn } from "./components/AuthComponents/SignIn";
import { PublicRoute } from "./components/AuthComponents/PublicRoute";
import { SignUp } from "./components/AuthComponents/SignUp";
import { Home } from "lucide-react";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;