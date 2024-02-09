import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NotesProvider } from "./context/appContext.jsx";
import { AuthProvider } from "./context/LoginContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <NotesProvider>
          <App />
      </NotesProvider>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
