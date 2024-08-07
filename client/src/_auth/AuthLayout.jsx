import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import "./authLayout.scss";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="auth-layout">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;
