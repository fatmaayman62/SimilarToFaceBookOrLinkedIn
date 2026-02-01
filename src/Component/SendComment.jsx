import { Button } from '@heroui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5"
import { UserContext } from '../Context/UserContextProvider'
import { GetComments } from '../Services/GetallComments'

function SendComment({ postId, setArrComments }) {
  const { edit, setEdit } = useContext(UserContext)

  const [inputComment, setInputComment] = useState('')
  const [isload, setIsload] = useState(false)

  function CreateComment(e) {
    e.preventDefault()

    if (edit?.name === 'comment') {
      updateComment()
      return
    }

    if (!inputComment.trim()) return

    setIsload(true)

    axios.post(
      "https://linked-posts.routemisr.com/comments",
      {
        content: inputComment,
        post: postId
      },
      {
        headers: {
          token: localStorage.getItem("userTokenizer")
        }
      }
    )
      .then(({ data }) => {
        setArrComments(data?.comments)
        setInputComment('')
      })
      .catch(console.log)
      .finally(() => setIsload(false))
  }


  async function commentsofPost() {
    let data=await GetComments(postId);
    setArrComments(data.comments.reverse())
  }

  function updateComment() {
    if (!edit?.id) return

    setIsload(true)

    axios.put(
      `https://linked-posts.routemisr.com/comments/${edit.id}`,
      { content: inputComment },
      {
        headers: {
          token: localStorage.getItem("userTokenizer")
        }
      }
    )
      .then(({ data }) => { 
        commentsofPost();
        setInputComment('');
        setEdit(null);
        console.log(edit)
      })
      .catch(console.log)
      .finally(() => setIsload(false))
  }

  useEffect(() => {
    if (edit?.name === 'comment' && edit?.post_id==postId) {
      setInputComment(edit.content || '')
    }
  }, [edit])

  return (
    <form onSubmit={CreateComment} className="my-2 flex gap-0 sm:gap-2 items-center">
      <input
        className="bg-slate-300/20 rounded-xl outline-0 p-1 sm:p-2.5 w-full text-sm"
        value={inputComment}
        onChange={(e) => setInputComment(e.target.value)}
        placeholder="Write comment..."
        type="text"
      />

      <Button isLoading={isload} variant="light" type="submit">
        <IoSend className="text-xl sm:text-2xl text-blue-600 hover:scale-110 transition" />
      </Button>
    </form>
  )
}

export default SendComment
