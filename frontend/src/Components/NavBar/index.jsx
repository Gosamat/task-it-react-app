import React, { useContext } from "react";
import "./index.css";
import {
  AuthDispatchContext,
  AuthStateContext,
} from "../../Context/AuthContext";

export function NavBar() {
  const { setCurrentForm, logout, checkLoggedStatus } =
    useContext(AuthDispatchContext);
  const { loggedUser } = useContext(AuthStateContext);

  return (
    <nav>
      <ul>
        <li>
          <h3>React Challenge</h3>
        </li>
        <li className="nav-bar-options-container">
          <a className="nav-bar-options" onClick={() => setCurrentForm("")}>
            To-do List
          </a>
          <a className="nav-bar-options" onClick={() => checkLoggedStatus()}>
            Profile
          </a>
        </li>
        <li>
          {loggedUser ? (
            <>
              <p>{loggedUser.username}</p>

              <button className="btn-auth" onClick={() => logout()}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-auth"
                onClick={() => setCurrentForm("login")}
              >
                Login
              </button>
              <button
                className="btn-auth"
                onClick={() => setCurrentForm("sign up")}
              >
                Sign up
              </button>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
