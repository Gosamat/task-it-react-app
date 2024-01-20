import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

import "./index.css";

export function SignUpForm() {
  //const { signUp, setUsername, setPass, setCurrentForm } =
  //  useContext(AuthDispatchContext);
 // const { username, pass } = useContext(AuthStateContext);

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="sign-up-container">
      <header className="sign-up-cta">
        <h2>Sign Up</h2>
      </header>
      <form>
        <div className="form-row">
          <input
            type="text"
            //value={username}
           // onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span>Username</span>
        </div>
        <div className="form-row">
          <input
            type="password"
           // value={pass}
           // onChange={(e) => setPass(e.target.value)}
            required
          />
          <span>Password</span>
        </div>
        <div className="form-row">
          <button
            className="btn-sign-up-form"
            onClick={(e) => handleSubmit(e)}
            type="submit"
          >
            Create Account!
          </button>
        </div>
      </form>
    </div>
  );
}
