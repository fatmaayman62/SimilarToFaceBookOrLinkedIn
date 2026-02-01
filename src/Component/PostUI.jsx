import React, { useState } from "react"; 
import Comment from "./Comment";
import { Link } from "react-router-dom";
import PostMainUI from "./PostMainUI";
import ListComments from "./ListComments";

function PostUI({ post,getAllPosts,getUserPosts}) {
  const [openList, setOpenList] = useState(false)
  const [ArrComments, setArrComments] = useState(post?.comments||[])

  function clickIconComments(){
    setOpenList(true);
  }
 
 
  return (
    <>
      <div className="w-full rounded-2xl border-3 border-gray-100 bg-gray-50 dark:bg-slate-800/50 dark:border-0 dark:text-white h-auto py-3 px-3 my-5">
       <PostMainUI post={post} getUserPosts={getUserPosts} getAllPosts={getAllPosts} setArrComments={setArrComments} ArrComments={ArrComments} clickIconComments={clickIconComments} />

        {ArrComments?.length !==0?<Comment setArrComments={setArrComments} post={post} commentData={ArrComments[0]} commentInfo={ArrComments[0]?.content}  />:null}
        
        
        {openList&&<ListComments post={post} postId={post?.id} postComments={ArrComments} setArrComments={setArrComments} setOpenList={setOpenList} />}

      </div>
    </>
  );
}

export default PostUI;
