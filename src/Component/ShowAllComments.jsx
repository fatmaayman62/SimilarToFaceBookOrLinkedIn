import React from 'react'
import Comment from './Comment'

function ShowAllComments({allComments,post,setArrComments }) {
  return (
    <>
        {allComments?.map((commentData)=><Comment post={post} setArrComments={setArrComments } key={commentData._id}  commentData={commentData} commentInfo={commentData?.content} />)}
    </>
  )
}

export default ShowAllComments