import { Button, Input } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoafingBtnSvg from '../components/LoafingBtnSvg'
import PostCard from '../components/PostCard'

export default function Search() {
    const location = useLocation()
    const navigate = useNavigate()
    const [sidebarData, setSidebarData] = React.useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    })
    const [posts, setPosts] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [showMore, setShowMore] = React.useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const sortFromUrl = urlParams.get('sort')
        const categoryFromUrl = urlParams.get('category')
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            })
        }

        const fetchPosts = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            try {
                const res = await axios.get(`/api/post/getposts?${searchQuery}`)
                // console.log(res)
                if (res.statusText === 'OK') {
                    setLoading(false)
                    setPosts(res.data.posts)
                    if (res.data.posts.length === 9) {
                        setShowMore(true)
                    } else {
                        setShowMore(false)
                    }
                } else {
                    console.log(res?.data?.message)
                }
            } catch (error) {
                console.log(error?.message)
            }
        }

        fetchPosts()
    }, [location.search])
    // console.log(sidebarData)


    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData(prev => ({ ...prev, searchTerm: e.target.value }))
        }
        if (e.target.id === 'sort') {
            setSidebarData(prev => ({ ...prev, sort: e.target.value }))
        }
        if (e.target.id === 'category') {
            setSidebarData(prev => ({ ...prev, category: e.target.value }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = '/search'
        if (sidebarData.searchTerm && sidebarData.sort === 'desc' && sidebarData.category === 'uncategorized') {
            navigate(`${url}?searchTerm=${sidebarData?.searchTerm}`)
        } else if (sidebarData.searchTerm === '' && sidebarData.sort !== 'desc' && sidebarData.category === 'uncategorized') {
            navigate(`${url}?sort=${sidebarData?.sort}`)
        } else if (sidebarData.searchTerm === '' && sidebarData.sort === 'desc' && sidebarData.category !== 'uncategorized') {
            navigate(`${url}?category=${sidebarData?.category}`)
        }
        else if (sidebarData.searchTerm && sidebarData.sort !== 'desc' && sidebarData.category === 'uncategorized') {
            navigate(`${url}?searchTerm=${sidebarData?.searchTerm}&sort=${sidebarData?.sort}`)
        } else if (sidebarData.searchTerm && sidebarData.sort === 'desc' && sidebarData.category) {
            navigate(`${url}?searchTerm=${sidebarData?.searchTerm}&category=${sidebarData?.category}`)
        }
        else if (sidebarData.searchTerm === '' && sidebarData.sort !== 'desc' && sidebarData.category) {
            navigate(`${url}?sort=${sidebarData?.sort}&category=${sidebarData?.category}`)
        }
        else if (sidebarData.searchTerm && sidebarData.sort && sidebarData.category) {
            navigate(`${url}?searchTerm=${sidebarData?.searchTerm}&sort=${sidebarData?.sort}&category=${sidebarData?.category}`)
        }
        else {
            navigate(`${url}`)
        }


    }
    const handleShowMore = async () => {
        const searchQuery = urlParams.toString()
        const startIndex = posts.length
        try {
            const res = await axios.get(`/api/post/getposts?${searchQuery}&startIndex=${startIndex}`)
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

    return (
        <div className='lg:flex'>
            <div className='px-5 pt-10  lg:max-h-screen lg:sticky lg:left-0 lg:top-0 lg:border-r border-b dark:border-white border-gray-500 lg:w-[300px] w-full'>
                <form action="" onSubmit={handleSubmit} className='space-y-5 pb-10'>
                    <div className='flex gap-2 items-center w-[200px]'>
                        <label htmlFor="">Search Term:</label>
                        <Input
                            id={'searchTerm'}
                            className='w-[200px] border rounded-lg h-10 dark:outline-white focus:border-white dark:text-white'

                            value={sidebarData?.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor="">Sort:</label>
                        <select name="" value={sidebarData?.sort} onChange={handleChange} id="sort" className='w-[200px] border rounded-lg h-10 dark:bg-transparent'>
                            <option value="desc">Desc</option>
                            <option value="asc">Asc</option>
                        </select>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor="">Category:</label>
                        <select name="" value={sidebarData?.category} onChange={handleChange} id="category" className='w-[200px] border rounded-lg h-10 dark:bg-transparent'>
                            <option value="uncategorized">select a Category</option>
                            <option value="vuejs" >Vue js</option>
                            <option value="reactjs">React js</option>
                            <option value="nextjs">Next js</option>
                        </select>
                    </div>
                    <Button type='submit' className='btn'>Search</Button>
                </form>
            </div>
            {/* posts */}
            <div className='lg:w-[calc(100vw-300px)] w-full  lg:h-max lg:overflow-y-scroll '>
                <div className='text-2xl font-semibold border-b dark:border-white border-gray-500 lg:py-5 py-3'>
                    <h1>Search Post section:</h1>
                </div>
                <div className='lg:px-10 p-5 lg:py-7'>
                    <div>
                        {posts.length === 0 ? <div className='h-[500px]  flex items-center justify-center'>
                            <p className='text-xl '>you have not post yet!</p>
                        </div> :
                            <>
                                {loading ? <div className='h-[300px] flex items-center justify-center'><LoafingBtnSvg /></div> : <>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                        {posts && posts.map(post => <PostCard key={post._id} post={post} />)}

                                    </div>
                                    {
                                        showMore && posts.length !== 0 && (
                                            <Button onClick={handleShowMore} className='w-full mt-5 py-4'>Show More</Button>
                                        )
                                    }
                                </>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
