import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { UserContext } from '../Context/UserContextProvider';

function LayOut() {
     const {darkMode, setDarkMode} = useContext(UserContext);
 


  return (
    <main className={`${darkMode?'dark':''}`}>
      <div className='bg-slate-50 dark:bg-slate-950'>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="sm:container h-screen pt-20 pb-8 overflow-hidden">
        <Outlet></Outlet>
      </div>
      </div>
    </main>
  )
}

export default LayOut