import React, { useContext } from "react";
import "./index.css";
import { AuthContext } from "../../Context/AuthContext";

export function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <h3>  {user ? user.username : "no user found"}</h3>
        </li>
        <li className="nav-bar-options-container">
            To-do List
            Profile
        </li>
        <li>
          {isLoggedIn ? (
            <>
              <p>{user.username}</p>

              <button className="btn-auth" onClick={() => logOutUser()}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-auth"
              >
                Login
              </button>
              <button
                className="btn-auth"
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
