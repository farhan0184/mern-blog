import { Button, Card, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomDialog from './CustomDialog'

export default function DashPost() {
  const { user } = useSelector((state) => state.user)
  // dialog
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  // post id
  const [postId, setPostId] = useState(null)



  const TABLE_HEAD = ["Date Update", "Post Image", "Post Title", "Category", "Delete", "Edit"];
  const [posts, setPosts] = useState([])
  const [showMore, setShowMore] = useState(true)
  // console.log(posts)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/post/getposts?userId=${user._id}`)
        if (res.statusText = 'OK') {
          setPosts(res?.data?.posts)
          if (res?.data?.posts?.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (user.isAdmin) {
      fetchPosts()
    }
  }, [user._id])
  // console.log(posts.length)

  const handleShowMore = async () => {
    const startIndex = posts.length
    try {
      const res = await axios.get(`/api/post/getposts?userId=${user._id}&startIndex=${startIndex}`)
      if (res.statusText === 'OK') {
        setPosts(prev => [...prev, ...res?.data?.posts])
        // console.log(res.data.posts.length < 9)
        if (res?.data?.posts?.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {

    }


  }

  const handleDeletePost = async ()=>{
    // console.log(postId, user._id)
    try {
      const res = await axios.delete(
        `/api/post/deletepost/${postId}/${user._id}`
      )
      // console.log(res)
      if(res.statusText !== 'OK'){
        console.log(res.data.message)

      }else{
        setPosts(posts.filter(post => post._id !== postId))
        setDialogOpen(false)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100'>
      <div className="h-min  my-10 ">
        <p>{posts.length}</p>
        {<><table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className='dark:bg-gray-600'>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b  border-blue-gray-100  bg-blue-gray-50 dark:bg-transparent p-4">
                  <Typography
                    variant="paragraph"
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
                    variant="paragraph"
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
                  <Link to={`/post/${post.slug}`} className='font-bold '>
                    {post.title}
                  </Link>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal dark:text-white"
                  >
                    {post.category}
                  </Typography>
                </td>
                <td className='p-4 border-b border-blue-gray-50'>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer text-base' onClick={()=>{
                    setPostId(post._id)
                    openDialog()
                  }}>Delete</span>
                </td>
                <td className='p-4 border-b border-blue-gray-50'>
                  <Link className='text-teal-500 hover:underline text-base' to={`/update-post/${post._id}`}>
                    Edit
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
          {
            showMore && posts.length !== 0 && (
              <Button onClick={handleShowMore} className='w-full mt-5 py-4'>Show More</Button>
            )
          }
        </>
        }
        {posts.length === 0 && (
          <div className='h-[500px]  flex items-center justify-center'>
            <p className='text-xl '>you have not post yet!</p>
          </div>
        )}
      </div>


      <CustomDialog isOpen={isDialogOpen} onClose={closeDialog}>
        <div className='w-[400px]'>
          <h2 className="text-xl font-bold mb-4 text-black">Are you went to delete this post?</h2>
          <div className='flex justify-end gap-3'>
            <Button className='bg-red-500' onClick={closeDialog}>close</Button>
            <Button onClick={handleDeletePost} className='bg-green-500'>Yes, sure</Button>
          </div>
        </div>
      </CustomDialog>

    </div>
  )
}
