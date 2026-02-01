import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { GetSinglePost } from '../Services/GetAllSerices';
import PostUI from '../Component/PostUI';
import PostMainUI from '../Component/PostMainUI';
import ShowAllComments from '../Component/ShowAllComments';
import ListComments from '../Component/ListComments';
import { UserContext } from '../Context/UserContextProvider';
import DesignOfCreatePost from '../Component/DesignOfCreatePost';

function PostDetails() {
       let {edit,setEdit}= useContext(UserContext);
     const location = useLocation(); 
    let {id}=useParams();
    const [post, setPost] = useState(null)
    const [ArrComments, setArrComments] = useState([]);
     const [openList, setOpenList] = useState(false);
    
      function clickIconComments(){
        setOpenList(true);
      }

    async function DataPost(PostId){
        let response=await GetSinglePost(PostId);
        setPost(response?.post);
        setArrComments(response?.post?.comments);
        console.log(response.post);

    }
    
    useEffect(()=>{
        DataPost(id);
    },[])
  return (
    <>
        
   {((location.pathname.startsWith('/postDetails')&&edit))&& <DesignOfCreatePost  callback={()=>DataPost(id)} />}
  
    <div className='bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 dark:bg-slate-800/50 dark:border-0 dark:text-white'>
    <PostMainUI setArrComments={setArrComments} clickIconComments={clickIconComments} ArrComments={ArrComments} post={post} />

    {ArrComments?.length!==0 ?<ShowAllComments setArrComments={setArrComments} allComments={ArrComments} post={post} />:null} 
        
        
        {openList&&<ListComments post={post} postId={post?.id} postComments={ArrComments} setArrComments={setArrComments} setOpenList={setOpenList} />}

    </div>
    
    </>
  )
}

export default PostDetails