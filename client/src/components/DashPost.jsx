import { Card, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function DashPost() {
  const { user } = useSelector((state) => state.user)
  const TABLE_HEAD = ["Date Update", "Post Image", "Post Title", "Category", "Delete", "Edit"];
  const [posts, setPosts] = useState([])
  console.log(posts)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/post/getposts?userId=${user._id}`)
        if (res.statusText = 'OK') {
          setPosts(res?.data?.posts)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (user.isAdmin) {
      fetchPosts()
    }
  }, [])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100'>
      <div className="h-min mx-auto my-10 ">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className='dark:bg-gray-600'>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b  border-blue-gray-100  bg-blue-gray-50 dark:bg-transparent p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 dark:text-white"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, idx) => (
              <tr key={idx} className='dark:border-gray-700 dark:text-white dark:bg-gray-800'>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal dark:text-white"
                  >
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Typography>
                </td>
                <td className='p-4 border-b border-blue-gray-50'>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                    />

                  </Link>
                </td>
                <td className='p-4 border-b border-blue-gray-50'>
                  <Link to={`/post/${post.slug}`} className='font-bold'>
                    {post.title}
                  </Link>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal dark:text-white"
                  >
                    {post.category}
                  </Typography>
                </td>
                <td className='p-4 border-b border-blue-gray-50'>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                </td>
                <td className='p-4 border-b border-blue-gray-50'>
                  <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                    Edit
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
