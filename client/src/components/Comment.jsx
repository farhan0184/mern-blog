import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {FaThumbsUp} from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Comment({comment, onLike, deleteComment}) {
    const {user: currentUser} = useSelector(state => state.user)
    // console.log(currentUser)
    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/user/${comment.userId}`)
                // console.log(res)
                if(res.statusText = 'OK') {
                    setUser(res.data)
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [])
    // console.log(comment.likes)
  return (
    <div className='flex gap-3 p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0'>
            <img className='w-10 h-10 rounded-full bg-gray-200' src={user?.profilePicture} alt={user?.username}/>
        </div>
        <div className='flex-1'>
            <div className='flex gap-3  mb-2'>
                <span className='font-bold  text-md truncate'>{user ? `@${user.username}`:'anonymous user'}</span>
                <span className='text-gray-500 text-xs'>{moment(comment?.createdAt).fromNow()}</span>
            </div>
            <p className='mb-2 text-gray-500'>{comment?.content}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-3'>
                <button onClick={()=>onLike(comment?._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                    <FaThumbsUp />
                </button>
                <p className='text-gray-400 pt-1'>
                    {
                        comment?.numberOfLikes > 0 ? comment?.numberOfLikes + " " + (comment?.numberOfLikes === 1 ? "like" : "likes"): 0 + " " + "like"
                    }
                </p>
                {currentUser && <>
                    <p className='text-gray-400 pt-1'>Edit</p>
                    <p className='text-gray-400 pt-1 cursor-pointer' onClick={()=>deleteComment(comment?._id)}>Delete</p>
                </>}
            </div>
        </div>
    </div>
  )
}
