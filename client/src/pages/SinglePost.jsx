import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Badge, Spinner } from '@material-tailwind/react'
import CallToAction from '../components/CallToAction'
export default function SinglePost() {
  const { postSlug } = useParams()
  console.log(postSlug)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [post, setPost] = useState(null)


  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/post/getposts?slug=${postSlug}`)
        // console.log(res.data.posts)
        if (res.statusText === 'OK') {
          setLoading(false)
          setPost(res.data.posts[0])
          setError(null)
        }
      } catch (error) {
        // console.log(error)
        setError(error)
        setLoading(false)
      }
    }
    fetchPost()
  }, [postSlug])

  if (loading) {
    return <div className='flex justify-center items-center min-h-screen'><Spinner className="h-12 w-12" /></div>
  }
  return (
    <div className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-3 p-3 text-center font-serif mx-w-2xl mx-auto lg:text-4xl'>{post && post?.title}</h1>

      <div className='flex justify-center my-5'>
        <Link to={`#`} className='border-[2px] w-max py-0.5 px-4 rounded-full hover:bg-blue-500 hover:text-white dark:hover:bg-gray-700'>{post && post?.category}</Link>
      </div>

      <div>
        <img src={post && post.image} alt={post && post.title} className='w-full max-h-[600px]  rounded-lg object-cover'/>
      </div>

      <div className='flex justify-between py-3 w-full max-w-2xl text-xs border-b border-gray-300 mx-auto mb-5'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div className='w-full max-w-2xl mx-auto post-content' dangerouslySetInnerHTML={{__html: post && post.content}}>

      </div>

      <div>
        <CallToAction/>
      </div>
    </div>
  )
}
