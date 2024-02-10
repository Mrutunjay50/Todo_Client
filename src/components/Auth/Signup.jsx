import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { API_URL } from "../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        name : "",
        email : "",
        password :"",
        cPassword :"",
    })
    const handleInput = (e) =>{
        const {name, value} = e.target;
        setSignupData((data) => ({...data, [name] : value}));
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      };
      const handleSubmit = async (event) => {
        try {
          await axios.post(`${API_URL}/auth/signup`, {...signupData});   
    
          navigate("/login");
        } catch (error) {
          console.log("Unable to login:", error);
        }
        
      };
  return (
    <div className=' bg-[#4b4a4a] shadow-md shadow-[#131313] w-[30%] h-[80vh] rounded-md absolute left-[35%] top-20 p-10 flex flex-col justify-evenly'>
        <p className='text-center text-[30px] font-medium'>Signup</p>
        <div className='flex flex-col text-[25px]'>
            <label htmlFor="name">Name</label>
            <input className=' rounded-md px-2 py-1 mb-2' type="text" name="name" value={signupData.name} onChange={handleInput}/>
            <label htmlFor="email">Email</label>
            <input className=' rounded-md px-2 py-1 mb-2' type="email" name="email" value={signupData.email} onChange={handleInput}/>
            <label htmlFor="password">Password</label>
            <input className=' rounded-md px-2 py-1 mb-2' type="password" name="password" value={signupData.password} onChange={handleInput}/>
            <label htmlFor="cPassword">Confirm Password</label>
            <input onKeyDown={handleKeyDown} className=' rounded-md px-2 py-1 mb-2' type="cPassword" name="cPassword" value={signupData.cPassword} onChange={handleInput}/>
        </div>
        <Link className='absolute bottom-12 left-10' to="/login">Already a User!</Link>
        <span onClick={handleSubmit} className='absolute bottom-10 right-10 cursor-pointer border-2 rounded-md px-3 py-1 border-[#FF8FB1]'>Signup</span>
    </div>
  )
}

export default Signup