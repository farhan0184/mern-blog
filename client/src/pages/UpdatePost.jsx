import React, { useEffect, useState } from 'react'
import PostForm from '../components/PostForm'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function UpdatePost() {
    const {postId} = useParams()
    const [post, setPost] = useState(null)
    
    
    console.log(post)

    useEffect(()=>{
        try {
            const fatchPost = async ()=>{
                const res = await axios.get(`/api/post/getposts?postId=${postId}`)
                // console.log(res)
                if(res.statusText === 'OK'){
                    setPost(res?.data?.posts[0])
                }else{
                    console.log(res.data.message)
                }
            }
            fatchPost()
        } catch (error) {
            console.log(error.message)
        }
    },[postId])
  return (
    <div>
        {post? <PostForm post={post} isUpdate={true}  /> : <div className='h-[500px] flex items-center justify-center'>
            <p className='text-center text-xl font-bold'>Loading...</p>    
        </div>}
    </div>
  )
}
