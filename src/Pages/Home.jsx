import React, { useContext, useEffect, useState } from 'react'
import DesignOfCreatePost from '../Component/DesignOfCreatePost'
import PostUI from '../Component/PostUI'
import { GetAllPosts } from '../Services/GetAllSerices'
import LoadingSkeleton from '../Component/LoadingSkeleton'
import { UserContext } from '../Context/UserContextProvider'
import { useLocation } from 'react-router-dom'

function Home({ posts_user, getUserPosts }) {
  const [posts, setPosts] = useState([])
  const { edit } = useContext(UserContext)
  const location = useLocation()

  // Fetch all posts for feed if user has no posts
  async function getAllPosts() {
    const response = await GetAllPosts()
    setPosts(response?.posts)
  }

  // Sync posts state when posts_user changes
  useEffect(() => {
    if ((posts_user || [])?.length !== 0) {
      setPosts(posts_user)
    } else {
      getAllPosts()
    }
  }, [posts_user])

  return (
    <>
      {( (location.pathname === '/personal-page' && edit)) &&
        <DesignOfCreatePost callback={getUserPosts} />
      }
      { (posts_user || [])?.length === 0  &&
        <DesignOfCreatePost callback={getAllPosts} />
      }
<div className="overflow-y-auto h-full mt-2 scrollbar-hide rounded-t-2xl">
  
        {posts?.length !== 0 ? posts.map(post => (
          <div key={post.id} className='my-2 '>
            <PostUI getAllPosts={getAllPosts} post={post} getUserPosts={getUserPosts} />
          </div>
        )) : <LoadingSkeleton />}
</div>
    </>
  )
}

export default Home
