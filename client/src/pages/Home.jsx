import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from '../components/PostCard'
import LoafingBtnSvg from '../components/LoafingBtnSvg'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            const res = await axios.get('/api/post/getposts?limit=6')
            if (res.statusText === 'OK') {
                setLoading(false)
                setPosts(res.data.posts)

            }
            else {
                console.log(res.data.message)
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])
    return (
        <div>
            <div className="flex flex-col justify-center items-center h-[50vh]">

                <h1 className="text-3xl font-bold">Welcome to My Blog</h1>
                <p className="text-gray-500 text-sm w-[30%] text-center mt-2">Here, you'll find  variety of articles and tutorials on topics such as web development, software engineering, and more.</p>
                <Link to={'/search'} className='text-sm mt-5 text-blue-700'>View all posts</Link>

            </div>
            <div className="flex flex-col items-center justify-center h-[50vh] my-10 w-full bg-deep-orange-100/60" >
                <CallToAction />
            </div>

            <div className='my-5'>
                <h1 className="text-3xl font-bold text-center">Recent Posts</h1>
                <div className='md:w-[80%] w-[70%] mx-auto mt-5 flex justify-center flex-col'>
                    <div >
                        {loading ? <div className='h-[300px] flex items-center justify-center'><LoafingBtnSvg /></div> : <>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                {posts && posts.map(post => <PostCard key={post._id} post={post} />)}

                            </div>
                            <div className='text-center text-md mt-5'>
                                <Link to={'/search'} className=' text-blue-700 text-center'>View all posts</Link>
                            </div>

                        </>
                        }
                    </div>


                </div>

            </div>
        </div >
    )
}
