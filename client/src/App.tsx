import { Route, Routes } from "react-router-dom";
import "./App.css";
import Explore from "./pages/interest";
import Applayout from "./pages/home";
import Auth from "./pages/auth";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Applayout />}>
        <Route path="interest" element={<Explore />} />
      </Route>

      <Route path="auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
