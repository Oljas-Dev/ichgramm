import { Route, Routes } from "react-router-dom";
import "./App.css";
import Explore from "./pages/explore";
import Applayout from "./pages/home";
import Auth from "./pages/auth";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgot-password";
import Homepage from "./pages/home/homepage";
import ProfilePage from "./pages/profile";
import ProtectedRoute from "./pages/auth/protectedRoute";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useEffect } from "react";
import { getUser } from "./redux/slices/authSlice";
import EditProfile from "./pages/profile/edit";
import Messages from "./pages/messages";

function App() {
  const token = useAppSelector((state) => state.user.token);
  const status = useAppSelector((state) => state.user.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token, dispatch]);

  // Wait until authentication is checked
  if (token && status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Applayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Homepage />} />
        <Route path="explore" element={<Explore />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditProfile />} />
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
