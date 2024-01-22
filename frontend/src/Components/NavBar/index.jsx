import React, { useContext } from "react";
import "./index.css";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <h3>  {user ? user.Username : "no user found"}</h3>
        </li>
        {user ?
        <li>
        <Link to="/tasks">
        <h3>Task Lists</h3>
        </Link>
        </li>: ""}
        {user ?
        <li>
        <Link to="/profile">
        <h3>Profile</h3>
        </Link>
        </li>: ""}
        <li>
          {isLoggedIn ? (
            <>
              <p>{user.Username}</p>

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
