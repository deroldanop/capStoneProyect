import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import NavBar from "./components/NavBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import News from "./components/News.jsx";
import NewsPage from "./components/NewsPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <div>
          <NavBar />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:title" element={<NewsPage />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
