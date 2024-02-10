import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "./components/nav_footer/index";
import { AllNotes, CreateNote, Home } from "./components/home/index";
import { Login, Signup } from "./components/Auth";

const App = () => {
  const isAuth = localStorage.getItem("isAuthenticated");

  const path = window.location.pathname;
  if(path === '/' && !isAuth || path === '/allnotes' && !isAuth){
    window.location.pathname = '/login';
  }
  const ProtectedRoute = ({ element, path}) => {
    // if (!isAuth && !['/login', '/register'].includes(path)) {
    //   return <Navigate to="/login" />;
    // }
  
    return element;
  };

  return (
    <>
      <Nav />
      <div className="flex flex-row w-full min-h-[100vh] font-poppins">
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} path="/" />} />
          <Route path="/seenote/:id" element={<ProtectedRoute element={<CreateNote see={true} create={false} edit={false} />} path="/seenote/:id" />} />
          <Route path="/addnote" element={<ProtectedRoute element={<CreateNote create={true} see={false} edit={false} />} path="/addnote" />} />
          <Route path="/editnote/:id" element={<ProtectedRoute element={<CreateNote edit={true} see={false} create={false} />} path="/editnote/:id" />} />
          <Route path="/allnotes" element={<ProtectedRoute element={<AllNotes />} path="/allnotes" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

