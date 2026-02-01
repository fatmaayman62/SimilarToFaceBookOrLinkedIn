import React from 'react' ;
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,

} 
from "@heroui/react";

import { FiLogOut } from "react-icons/fi";
import  img   from "../assets/user.png";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContextProvider';
import { IoSunnyOutline } from "react-icons/io5"; 
 import { IoMoonOutline } from "react-icons/io5";
function Navbar({darkMode, setDarkMode}) { 
  const {signed,setSigned,profileData,imageURL}=useContext(UserContext); 

  function LogOutWebsite(){
    localStorage.removeItem("userTokenizer");
    setSigned(false);

    localStorage.removeItem ('CounterPosts');
  }

 


  return (

     
       <Nav className="bg-slate-200 z-99999 fixed top-0 inset-x-0 dark:bg-slate-900 dark:shadow-gray-700 shadow dark:text-white">
      
          <NavbarContent>
            <NavbarBrand>
              <h1 className="font-bold text-xl text-sky-800"><Link to={'/'}>Convera</Link></h1>
            </NavbarBrand>
          </NavbarContent>


          <NavbarContent justify="end" className='w-fit'>
          {darkMode?<IoSunnyOutline onClick={()=>{setDarkMode(false);localStorage.removeItem('mode')}} className='text-xl' />:<IoMoonOutline onClick={()=>{setDarkMode(true);localStorage.setItem('mode',"true")}} className='text-xl' />} 
            {
              !signed?<>
            <NavbarItem className="flex items-center">
              <Link className='text-blue-600' to="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Link className='text-green-600' to="/register">Register</Link>
            </NavbarItem>
            </>:<>
            <NavbarItem className='h-10 w-10 border-3 p-0.5 border-sky-800 rounded-full overflow-hidden'>
              <Link to={'/personal-page'}><img className='h-full w-full bg-gray-300 rounded-full' src={imageURL||profileData?.photo||img} onError={(e)=>e.target.src=img} alt="img" /></Link>
            </NavbarItem>
            <NavbarItem>
              <p onClick={()=>LogOutWebsite()} className='text-red-700 text-xl cursor-pointer'><FiLogOut /></p>
            </NavbarItem>
            </>
            }
          </NavbarContent>
    
           </Nav>
   
     
  )
}

export default Navbar