import React from 'react'
import ProfileUser from './ProfileUser' 


function Comment({post,setArrComments,commentData,commentInfo}) {
  return (
    
    <div className='rounded-2xl my-3 p-2 pb-3 bg-gray-100 dark:bg-slate-700/30'>
        <ProfileUser post={post} setArrComments={setArrComments} comId={commentData?._id} commentId={commentData?.commentCreator?._id} name={commentData?.commentCreator?.name} date={post?.createdAt} image={commentData?.commentCreator?.photo} commentInfo={commentInfo} />
        <p className='mx-2 dark:text-gray-400'>{commentData?.content}</p>
    </div> 
  )

}

export default Comment