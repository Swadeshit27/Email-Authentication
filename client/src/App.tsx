import { Route, Routes } from "react-router-dom";
import SendVerificationLink from "./pages/SendVerificationLink";
import CreateProfile from "./pages/CreateProfile";
import WhatsMake from "./pages/WhatsMake";
import Register from "./pages/Register";
import axios from "axios";
import EmailVerification from "./pages/EmailVerification";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { useAppSelector } from "./redux/store";
import { useEffect } from "react";

export default function App() {
  const { token } = useAppSelector(state => state.User);
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token])
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/create-profile"
          element={
            <PublicRoute>
              <CreateProfile />
            </PublicRoute>
          }
        />
        <Route
          path="/preferences"
          element={
            <PublicRoute>
              <WhatsMake />
            </PublicRoute>
          }
        />
        <Route
          path="/send-verification"
          element={
            <PublicRoute>
              <SendVerificationLink />
            </PublicRoute>
          }
        />
        <Route
          path="/verifyemail"
          element={
            <PublicRoute>
              <EmailVerification />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}
