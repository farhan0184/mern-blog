import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

export default function Comment({comment}) {
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
    // console.log(user)
  return (
    <div className='flex gap-3 p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0'>
            <img className='w-10 h-10 rounded-full bg-gray-200' src={user?.profilePicture} alt={user?.username}/>
        </div>
        <div className='flex-1'>
            <div className='flex gap-3  mb-2'>
                <span className='font-bold  text-md truncate'>{user ? `@${user.username}`:'anonymous user'}</span>
                <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='mb-2 text-gray-500'>{comment.content}</p>
        </div>
    </div>
  )
}
