import React, { useState } from 'react'
import ProfileUser from './ProfileUser'
import { Link } from 'react-router-dom'
import PostFooter from './PostFooter'
import SendComment from './SendComment'

function PostMainUI({post,clickIconComments,setArrComments,getAllPosts,ArrComments,getUserPosts}) { 

  return (
    <>
        
        <ProfileUser getUserPosts={getUserPosts} setArrComments={setArrComments} post={post} getAllPosts={getAllPosts} name={post?.user?.name} date={post?.createdAt} image={post?.user?.photo} />

        <Link to={`/postDetails/${post?.id}`}>
          {post?.body && <p className='dark:text-gray-400'>{post?.body}</p>}
          {post?.image && (
            <img
              className="my-2 rounded-xl h-50 sm:h-86 w-full object-cover"
              src={post?.image}
              onError={(e) => (e.target.src = img)}
              alt=""
            />
          )}
        </Link>

        <PostFooter ArrComments={ArrComments} post={post} clickIconComments={clickIconComments} />

        <SendComment setArrComments={setArrComments} postId={post?.id} />
    </>
  )
}

export default PostMainUI