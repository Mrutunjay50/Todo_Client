import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/LoginContext";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData, setToken } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData((data) => ({ ...data, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = async (event) => {
    const { email, password } = loginData;
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });
      const { token, existingUser } = response.data;
      setUserData(existingUser);
      setToken(token);

      localStorage.setItem("isAuthenticated", true);
      document.cookie = `jwt=` + token;

      navigate("/");
    } catch (error) {
      console.log("Unable to login:", error);
    }
  };
  return (
    <div className=" bg-[#4b4a4a] shadow-md shadow-[#131313] w-[30%] h-[80vh] rounded-md absolute left-[35%] top-20 p-10 flex flex-col justify-evenly">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <p className="text-center text-[30px] font-medium">Login</p>
      <div className="flex flex-col text-[25px]">
        <label htmlFor="email">Email</label>
        <input
          className=" rounded-md px-2 py-1 mb-2"
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleInput}
        />
        <label htmlFor="password">Password</label>
        <input
          className=" rounded-md px-2 py-1 mb-2"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
      </div>
      <p className="absolute top-4 right-1 left-4">
        if not getting redirected reload once the free server is indeed slow so
        apologies for that
      </p>
      <Link className="absolute bottom-12 left-10" to="/register">
        Haven't Registered Yet!
      </Link>
      <span
        onClick={() => handleSubmit()}
        className="absolute bottom-10 right-10 cursor-pointer border-2 rounded-md px-3 py-1 border-[#FF8FB1]"
      >
        Login
      </span>
    </div>
  );
};

export default Login;
