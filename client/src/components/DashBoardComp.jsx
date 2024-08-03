import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { HiAnnotation, HiArrowCircleUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

export default function DashBoardComp() {
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [lastMonthUsers, setLastMonthUsers] = useState(0)
    const [lastMonthPosts, setLastMonthPosts] = useState(0)
    const [lastMonthComments, setLastMonthComments] = useState(0)
    const { user } = useSelector(state => state.user)
    // console.log(user)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/user/user-list?limit=5')
                if (res.statusText === 'OK') {
                    setUsers(res.data.users)
                    setTotalUsers(res.data.totalUsers)
                    setLastMonthUsers(res.data.lastMonthUsers)
                }
            } catch (error) {
                console.log(error.message)
            }

        }
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/api/post/getposts?limit=5')
                if (res.statusText === 'OK') {
                    setPosts(res.data.posts)
                    setTotalPosts(res.data.totalPosts)
                    setLastMonthPosts(res.data.lastMonthPosts)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        const fetchComments = async () => {
            try {
                const res = await axios.get('/api/comment/getPostComments?limit=5')
                if (res.statusText === 'OK') {
                    setComments(res.data.comments)
                    setTotalComments(res.data.totalComments)
                    setLastMonthComments(res.data.lastMonthComments)
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        if (user.isAdmin) {
            fetchUsers()
            fetchPosts()
            fetchComments()
        }
    }, [user])
    return (
        <div className='px-3 py-5 md:mx-auto '>
            <div className='flex flex-wrap gap-4 justify-center'>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                            <p className='text-2xl'>{totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowCircleUp />
                            {lastMonthUsers}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                            <p className='text-2xl'>{totalPosts}</p>
                        </div>
                        <HiAnnotation className='bg-blue-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowCircleUp />
                            {lastMonthPosts}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                            <p className='text-2xl'>{totalComments}</p>
                        </div>
                        <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowCircleUp />
                            {lastMonthComments}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-4 justify-center py-10'>
                <div className='flex flex-col  w-full md:w-auto  shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent users</h1>
                        <Link to={'/dashboard?tab=users'}>
                            <Button className='btn'>View All</Button>
                        </Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className='py-3 text-start border-b border-blue-gray-50 w-1/2'>UserImg</th>
                                <th className='py-3 border-b border-blue-gray-50 text-start'>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&users.map((user) => (
                                <tr key={user._id}>
                                    <td className={`py-3 ${users.length - 1 === users.indexOf(user) ? '' : 'border-b'} border-blue-gray-50`}>
                                        <img
                                            src={user.profilePicture}
                                            alt={user.username}
                                            className='w-14 h-14 object-cover bg-gray-500 rounded-full'
                                        />
                                    </td>
                                    <td className={`py-3 ${users.length - 1 === users.indexOf(user) ? '' : 'border-b'} border-blue-gray-50 `}>
                                        {user.username}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col w-full md:w-auto  shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Comments</h1>
                        <Link to={'/dashboard?tab=comments'}>
                            <Button className='btn'>View All</Button>
                        </Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className='py-3 text-start border-b border-blue-gray-50 w-1/2'>Comment</th>
                                <th className='py-3 border-b border-blue-gray-50 text-start'>Likes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments && comments.map((comment) => (
                                <tr key={comment._id}>
                                    <td className={`py-3 ${comments.length - 1 === comments.indexOf(comment) ? '' : 'border-b'} border-blue-gray-50`}>
                                        {comment.content}
                                    </td>
                                    <td className={`py-3 ${comments.length - 1 === comments.indexOf(comment) ? '' : 'border-b'} border-blue-gray-50 `}>
                                        {comment.numberOfLikes}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col w-full md:w-auto  shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Posts</h1>
                        <Link to={'/dashboard?tab=posts'}>
                            <Button className='btn'>View All</Button>
                        </Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className='py-3 text-start border-b border-blue-gray-50 w-1/2'>PostImg</th>
                                <th className='py-3 border-b border-blue-gray-50 text-start'>Post Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts.map((post) => (
                                <tr key={post._id}>
                                    <td className={`py-3 ${posts.length - 1 === posts.indexOf(post) ? '' : 'border-b'} border-blue-gray-50`}>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className='w-14 h-14 object-cover bg-gray-500 rounded-full'
                                        />
                                    </td>
                                    <td className={`py-3 ${posts.length - 1 === posts.indexOf(post) ? '' : 'border-b'} border-blue-gray-50`}>
                                        {post.title}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
