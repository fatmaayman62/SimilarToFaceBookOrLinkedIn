import axios from 'axios';
import React,{createContext} from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const UserContext=createContext();
function UserContextProvider( {children}) {
    const [signed, setSigned] = useState(localStorage.getItem('userTokenizer') !== null);
     const [darkMode, setDarkMode] = useState(localStorage.getItem('mode')||false)
    const [imageURL, setImageURL] = useState(null);
    const [edit, setEdit] = useState(null);

    const [profileData, setProfileData] = useState(null);

    function getProfileData(){
      axios.get('https://linked-posts.routemisr.com/users/profile-data',{
          headers:{
                token:localStorage.getItem("userTokenizer")
            },
      }).then(({data})=>{setProfileData(data.user);setImageURL(data?.user?.photo)}).catch(err=>console.log(err))
    }

    useEffect(()=>{
      if(signed)
      getProfileData();
    },[signed]);
 

  return (
    <UserContext.Provider value={ {signed, setSigned,profileData,imageURL,setImageURL,edit, setEdit,darkMode, setDarkMode} }>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider