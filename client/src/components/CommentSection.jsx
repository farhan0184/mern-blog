import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function CommentSection({ postId }) {
  const { user } = useSelector(state => state.user)
  // console.log(user)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (comment.length === 0 || comment.length > 200) {
      return
    }
    try {
      const res = await axios.post('/api/comment/create', { content: comment, postId, userId: user._id })
      if (res.data.status === 'ok') {
        setComment('')
        setCommentError(null)
      }
    } catch (error) {
      setCommentError(error.message)
    }
  }
  // console.log(comment)
  return (
    <div className='w-full max-w-2xl mx-auto my-10'>
      {user ? (
        <div className='flex items-center gap-1 text-gray-500 text-sm'>
          <p>Sign in as:</p>
          <img src={user.profilePicture} alt={user.username} className='w-5 h-5 rounded-full' />
          <Link to={'/dashboard?tab=profile'} className='hover:underline text-cyan-600 '>@{user.username}</Link>
        </div>
      ) :
        (<div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link to={'/sign-in'} className='hover:underline text-blue-500'>Sign In</Link>
        </div>)
      }

      {user && (
        <form onSubmit={handleSubmit} className='my-5 border-2 p-5 rounded-md border-light-green-700'>
          <textarea placeholder='Add a comment...' className='w-full p-2 border border-gray-300 rounded-md h-24 dark:bg-transparent' maxLength={200} onChange={(e) => setComment(e.target.value)} defaultValue={comment} />
          <div className='flex items-center justify-between my-3 outline-light-green-300'>
            <p>{200 - comment?.length} characters remaining</p>
            <Button className='btn' type='submit'>Submit</Button>
          </div>
          {commentError && <p className='text-red-600 '>{commentError}</p>}
        </form>
      )}


    </div>
  )
}
