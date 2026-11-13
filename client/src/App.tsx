import { Route, Routes } from "react-router-dom";
import "./App.css";
import Explore from "./pages/interest";
import Applayout from "./pages/home";
import Auth from "./pages/auth";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgot-password";
import CreatePost from "./pages/home/create-post";
import Homepage from "./pages/home/homepage";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Applayout />}>
        <Route index element={<Homepage />} />
        <Route path="interest" element={<Explore />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
