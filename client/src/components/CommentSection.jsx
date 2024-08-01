import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Comment from './Comment'

export default function CommentSection({ postId }) {
  const { user } = useSelector(state => state.user)
  // console.log(user)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [commentError, setCommentError] = useState(null)



  // create comment
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (comment.length === 0 || comment.length > 200) {
      setCommentError('Comment must be between 1 and 200 characters')
      return
    }
    try {
      const res = await axios.post('/api/comment/create', { content: comment, postId, userId: user._id })
      // console.log(res)
      if (res.statusText === 'Created') {

        setComment('')
        setCommentError(null)
        setComments([res.data, ...comments])
      }
    } catch (error) {
      setCommentError(error.message)
    }
  }

  // fetch comments
  useState(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment/getPostComments/${postId}`)
        // console.log(res)
        if (res.statusText = 'OK') {
          setComments(res.data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchComments()
  }, [postId])


  // console.log(comment)

  // like comment
  const handleLike = async (commentId) => {
    // console.log(commentId)
    try {
      const res = await axios.put(`/api/comment/likeComment/${commentId}`)
      // console.log(res.data)
      if (res.statusText === 'OK') {
        // console.log(res.data)
        setComments(comments.map((comment) =>
          comment._id === commentId ? {
            ...comment,
            likes: res.data.likes,
            numberOfLikes: res.data.likes.length
          } : comment
        ))
      } else {
        console.log(res.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  // delete comment
  const handleCommentDelete = async (commentId) => {
    // console.log(commentId)
    try {
      const res = await axios.delete(`/api/comment/deleteComment/${commentId}`)
      if (res.statusText === 'OK') {
        setComments(comments.filter(comment => comment._id !== commentId))
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  // update comment
  const handleEdit = (commentId, newContent)=>{
    setComments(comments.map((comment) =>
      comment._id === commentId ? {
        ...comment,
        content: newContent
      } : comment
    ))
  }
  
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
          <textarea placeholder='Add a comment...' className='w-full p-2 border border-gray-300 rounded-md h-24 dark:bg-transparent' maxLength={200} onChange={(e) => setComment(e.target.value)} value={comment} />
          <div className='flex items-center justify-between my-3 outline-light-green-300'>
            <p>{200 - comment?.length} characters remaining</p>
            <Button className='btn' type='submit'>Submit</Button>
          </div>
          {commentError && <p className='text-red-600 '>{commentError}</p>}
        </form>
      )}

      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          {user && 
            <>
              <div className='text-sm py-5 flex items-center gap-1'>
                <p>Comments</p>
                <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                  <p>{comments.length}</p>
                </div>
              </div>
              {comments.map((comment) => {
                // console.log(comment)
                return comment && <Comment key={comment?._id} comment={comment} onLike={handleLike} deleteComment={handleCommentDelete}  onEdit={handleEdit} />
              })}
            </>
          }
        </>
      )}
    </div>
  )
}
