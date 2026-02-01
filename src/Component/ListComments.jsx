import React from 'react'
import ShowAllComments from './ShowAllComments'
import SendComment from './SendComment'


function ListComments({postId,post, postComments,setArrComments,setOpenList}) {
  
  return (<>
  
    <div className='overflow-y-auto fixed inset-x-0  dark:bg-slate-900 dark:text-gray-400 bottom-0 top-1/2 rounded-t-2xl p-4 pt-2 shadow overflow-y-auto bg-white z-20'>
        <SendComment postId={postId} setArrComments={setArrComments} />
         {postComments.length !==0?<ShowAllComments setArrComments={setArrComments} allComments={postComments} post={post}  />:null}
    </div>

    <div className="fixed inset-0 bg-black/20 z-19" onClick={()=>setOpenList(false)}></div>
    

  
  </>
  )
}

export default ListComments