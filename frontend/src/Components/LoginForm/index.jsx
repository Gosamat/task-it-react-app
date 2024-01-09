import React, { useContext, useState } from "react";
import "./index.css";
import {
  AuthDispatchContext,
  AuthStateContext,
} from "../../Context/AuthContext";

export function LoginForm() {
  const { username, pass } = useContext(AuthStateContext);

  const { setUsername, setPass, login, setCurrentForm } =
    useContext(AuthDispatchContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, pass);
  };

  return (
    <div className="login-container">
      <header className="login-cta">
        <h2>Login</h2>
      </header>
      <form>
        <div className="form-row">
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <span>Username</span>
        </div>
        <div className="form-row">
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <span>Password</span>
        </div>
        <div className="form-row">
          <button
            className="btn-login-form"
            onClick={(e) => handleSubmit(e)}
            type="submit"
          >
            Login to your Account!
          </button>
        </div>
        <a onClick={() => setCurrentForm("sign up")}>Don't have an account?</a>
      </form>
    </div>
  );
}
