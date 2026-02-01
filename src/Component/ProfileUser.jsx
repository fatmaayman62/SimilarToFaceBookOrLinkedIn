import React, { useContext } from 'react'
import img from '../assets/img.png'
import { UserContext } from '../Context/UserContextProvider';
import DropDownList from './DropDownList';
import axios from 'axios';
import { GetSinglePost } from '../Services/GetSingleDataOfPost';
import { useLocation, useNavigate } from 'react-router-dom'; 
function ProfileUser({post,name,comId,date,image,commentId,getAllPosts,setArrComments,getUserPosts,commentInfo}) {
 let {profileData,imageURL,setEdit}= useContext(UserContext);
 const location = useLocation();
 let navigate=useNavigate();  
 
 


 async function singlePost() {
  let response=await GetSinglePost(post?.id);
  console.log(response?.post?.comments);
  setArrComments(response?.post?.comments);

 }

 function identifyEdit(){
  let data;
  if(((post?.user._id==profileData?._id)&&(post?.user._id==commentId))){
   data={
      name:"comment",
      id:comId,
      content:commentInfo,
      post_id:post?.id
    }
  }else{
       data={
      name:"post",
      id:post?.id
    }
  }
  setEdit(data);

 }

 

 function deleteFunction(){
  let Url;
  if((post?.user._id==profileData?._id)&&(post?.user._id==commentId)){
    Url=`https://linked-posts.routemisr.com/comments/${comId}`
  }else{
    Url=`https://linked-posts.routemisr.com/posts/${post?.id}`
  }
  axios.delete(Url,{
     headers:{
                token:localStorage.getItem("userTokenizer")
            },
  }).then(()=>{
  if((post?.user._id==profileData?._id)&&(post?.user._id==commentId)){
    singlePost();
  }else{
    if(location.pathname == '/personal-page'){
 
      getUserPosts();  
    }else if(location.pathname == '/'){
      getAllPosts(); 
    }else{
      navigate('/')
    }
  }
  }).catch(err=>console.log(err))
 }

  return (
    <>
        <div className="w-full h-16 flex items-center justify-between ">
            <div className="flex">
            <img className={`${commentId?'border-3 border-gray-200 dark:border-gray-300/80':'border-3 border-white dark:border-gray-300'} ' rounded-full w-10 h-10 mr-3 object-cover' `} src={((((post?.user._id==profileData?._id)&&(post?.user._id==commentId))||(!commentId && post?.user._id==profileData?._id))&&imageURL)||image} onError={(e)=>e.target.src=img} alt="" />
            <div>    
                <h3 className="text-md font-semibold capitalize dark:text-gray-400">{name}</h3>
                <p className="text-xs text-gray-500">{date?.split("T")[0].replace(/-/g, " ")}</p>
            </div>
            </div>
            {
            (((post?.user._id==profileData?._id)&&(post?.user._id==commentId))||(!commentId && post?.user._id==profileData?._id))&&
           <DropDownList deleteFunction={deleteFunction} identifyEdit={identifyEdit} />
           }
        </div>   
    </>
  )
}

export default ProfileUser