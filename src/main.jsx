import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./context/UserContextProvider.jsx";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// for production
// axios.defaults.baseURL = "https://school.website.vidyamint.com/"; 
let BASE_URL = import.meta.env.VITE_BACKEND_URL;

if(import.meta.env.VITE_ENV_MODE === 'development'){
  BASE_URL = import.meta.env.VITE_LOCALHOST;
}
console.log("BASE_URL = ",BASE_URL);
// for development
axios.defaults.baseURL = BASE_URL;
export const defaultSchoolCode = "2130360";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <UserContextProvider>
        <Toaster />
        <App />
      </UserContextProvider>
    </CookiesProvider>
  </React.StrictMode>
);
