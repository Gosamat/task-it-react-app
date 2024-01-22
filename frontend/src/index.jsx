import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {AuthProviderWrapper} from "./Context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <Router>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
