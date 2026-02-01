import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../Context/UserContextProvider'

function LayOutAuth() {
    const {darkMode, setDarkMode} = useContext(UserContext);
  
  return (
    <main className={`${darkMode?'dark':''}`}>
    
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <div className=' dark:bg-slate-950'>
    <div className=" sm:container min-h-screen pt-10 flex justify-center items-center">
        <Outlet></Outlet>
    </div>

    </div>
    </main>
  )
}

export default LayOutAuth