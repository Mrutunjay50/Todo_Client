import React, { useEffect, useState } from "react";
import { MEMOPAD, Home, Logout, StickyNotes, User, Icon } from "../../assets/index";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/LoginContext";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const {handleLogout, userData} = useAuth();

  useEffect(() => {
    setOpen(false);
  },[userData])

  return (
    <>{userData && <div className="bg-[#0000CD] h-[100vh] w-[60px] text-white flex flex-col items-center justify-between py-5 fixed shadow-md shadow-[#131313]">
    <img src={Icon} alt="Logo" className=""/>

    <div className=" flex flex-col items-center justify-between h-[20vh]">
      <Link to="/" className="cursor-pointer">
        <img src={Home} alt="Logo" />
        {open && "Home"}
      </Link>
      
      <Link to='/allnotes' className="cursor-pointer">
        <img src={MEMOPAD} alt="allnotes" />
        {open && "All Notes"}
      </Link>
      <Link to='/addnote' className="cursor-pointer">
        <img src={StickyNotes} alt="Logo" />
        {open && "Create Notes"}
      </Link>
    </div>

    <div className="h-[10vh] flex flex-col justify-between items-center">
      <span className="cursor-pointer" onClick={() => handleLogout()}>
        <img src={Logout} alt="Logo" />
        {open && "Logout"}
      </span>
      <Link to='/' className="cursor-pointer">
        <img src={User} alt="Logo" />
        {open && "userImg"}
      </Link>
    </div>
  </div>}</>
  );
};

export default Nav;
