import { Children, useState } from 'react'
import './App.css'
import LayOut from './Component/LayOut'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import LayOutAuth from './Component/LayOutAuth'
import ProutectedRoutes from './ProtectRouting/ProutectedRoutes'
import ProtectedAuth from './ProtectRouting/ProtectedAuth'
import PostDetails from './Pages/PostDetails'
import Personal_Page from './Pages/Personal_Page'


let router=createBrowserRouter([
  {path:'',element:<LayOut />,children:[
    {index:true,element:<ProutectedRoutes><Home /></ProutectedRoutes>},
    {path:'postDetails/:id',element:<ProutectedRoutes><PostDetails /></ProutectedRoutes>},
    {path:'personal-page',element:<ProutectedRoutes><Personal_Page /></ProutectedRoutes>},
  ]},
  {path:'',element:<LayOutAuth />,children:[
    {path:'login',element:<ProtectedAuth><Login /></ProtectedAuth> },
    {path:'register',element:<ProtectedAuth><Register /></ProtectedAuth>},
  ]}
]);


function App() { 
  

  return (
    <RouterProvider router={router}> 
  
    </RouterProvider>
  )
}

export default App
