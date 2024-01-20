import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios'
import "./index.css";


export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {storeToken, authenticateUser, API_URL} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);



  
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      username,
      password
    };
    axios.post(`${API_URL}/users/login`, requestBody)
    .then((response) => {
        storeToken(response.data.access_token);
        authenticateUser();
      }).catch((error) => {
        const errorDescription =  error
        setErrorMessage(errorDescription);
      })

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </form>
    </div>
  );
}
