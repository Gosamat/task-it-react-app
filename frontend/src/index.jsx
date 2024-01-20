import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {AuthProviderWrapper} from "./Context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </React.StrictMode>
);
