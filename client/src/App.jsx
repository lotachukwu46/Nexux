import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignUpForm from "./_auth/forms/SignUpForm";
import SignInForm from "./_auth/forms/SignInForm";
import Home from "./_root/pages/Home";
import Settings from "./_root/pages/Settings";
import Header from "./components/header/Header";
import { ThemeProvider } from "./_root/context/ThemeContext";
import "./App.scss";

const App = () => {
  return (
    <main>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Route>

        <Route
          element={
            <ThemeProvider>
              <RootLayout />
            </ThemeProvider>
          }
        >
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
