import React, { useState } from "react";
import { Footer, Nav, Header } from "./components/nav_footer/index";
import { AllNotes, CreateNote, Home } from "./components/home/index";
import { Login, Signup } from "./components/Auth";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const isAuth = localStorage.getItem("isAuthenticated");
  const ProtectedRoute = ({ element, path }) => {
    if (!isAuth && path !== '/login' && path !== '/register') {
      return <Navigate to="/login" />;
    }

    return element;
  };
  return (
    <>
      {isAuth && <Nav />}
      <div className="flex flex-row w-full min-h-[100vh]">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/seenote/:id"
            element={<ProtectedRoute element={<CreateNote see={true} create={false} edit={false} />} path="/seenote/:id" />}
          />
          <Route
            path="/addnote"
            element={<ProtectedRoute element={<CreateNote create={true} see={false} edit={false} />} path="/addnote" />}
          />
          <Route
            path="/editnote/:id"
            element={<ProtectedRoute element={<CreateNote edit={true} see={false} create={false} />} path="/editnote/:id" />}
          />
          <Route path="/allnotes" element={<ProtectedRoute element={<AllNotes />} path="/allnotes" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
