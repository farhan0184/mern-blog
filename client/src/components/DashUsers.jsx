import { Alert, Button, Card, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CustomDialog from './CustomDialog'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function DashUsers() {
    const { user } = useSelector((state) => state.user)
    // dialog
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    // post id
    const [userId, setUserId] = useState(null)
    const [success, setSuccess] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)



    const TABLE_HEAD = ["Date Update", "User Image", "Username", "Email", "Admin", "Delete"];
    const [users, setUsers] = useState([])
    const [showMore, setShowMore] = useState(true)
    // console.log(posts)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`/api/user/user-list?sort=asc`)
                // console.log(res)
                if (res.statusText = 'OK') {
                    setUsers(res?.data?.users)
                    if (res?.data?.users?.length < 9) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error)
                setErrorMessage(error.message)
            }
        }
        if (user.isAdmin) {
            fetchUsers()
        }
    }, [user._id])
    // console.log(posts.length)

    const handleShowMore = async () => {
        const startIndex = users.length
        try {
            const res = await axios.get(`/api/user/user-list?startIndex=${startIndex}`)
            if (res.statusText === 'OK') {
                setUsers(prev => [...prev, ...res?.data?.users])
                // console.log(res.data.posts.length < 9)
                if (res?.data?.users?.length < 9) {
                    setShowMore(false)
                }
            }
        } catch (error) {
            setErrorMessage(error.message)
        }


    }

    const handleUserDelete =async () =>{
        if(user.isAdmin){
            setErrorMessage("Admin can not delete")
            return
        }
        try {
            const res = await axios.delete(`/api/user/delete/${userId}`)
            console.log(res)
            if (res.statusText === 'OK') {
                setSuccess(res?.data?.message)
                setUsers(users.filter(user => user._id !== userId))
                setDialogOpen(false)
            }
            else{
                setErrorMessage(res?.data?.message)
            }
        } catch (error) {
            console.log(error)
            setErrorMessage(error.message)
        }
    }



    return (
        <div className='table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100'>
            <div className="h-min  my-10 ">
                {/* <p>{users.length}</p> */}
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
                        { users?.map((user, idx) => (
                            <tr key={idx} className='dark:border-gray-700 dark:text-white dark:bg-gray-800'>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography
                                        variant="paragraph"
                                        color="blue-gray"
                                        className="font-normal dark:text-white"
                                    >
                                        {new Date(user.updatedAt).toLocaleDateString()}
                                    </Typography>
                                </td>
                                <td className='p-4 border-b border-blue-gray-50'>
                                    <img
                                        src={user.profilePicture}
                                        alt={user.username}
                                        className='w-14 h-14 object-cover bg-gray-500 rounded-full'
                                    />
                                </td>
                                <td className='p-4 border-b border-blue-gray-50'>
                                    {user.username}
                                </td>
                                <td className='p-4 border-b border-blue-gray-50'>
                                    {user.email}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography
                                        variant="paragraph"
                                        color="blue-gray"
                                        className="font-normal dark:text-white "
                                    >
                                        {user.isAdmin ? <FaCheck className='text-green-500' /> : <FaTimes className='text-red-500' />}
                                    </Typography>
                                </td>
                                <td className='p-4 border-b border-blue-gray-50'>
                                    <span className='font-medium text-red-500 hover:underline cursor-pointer text-base' onClick={() => {
                                        setUserId(user._id)
                                        openDialog()
                                    }}>Delete</span>
                                </td>
                                {/* <td className='p-4 border-b border-blue-gray-50'>
                  <Link className='text-teal-500 hover:underline text-base' to={`/update-post/${post._id}`}>
                    Edit
                  </Link>
                </td> */}

                            </tr>
                        ))}
                    </tbody>
                </table>
                    {
                        showMore && users.length !== 0 && (
                            <Button onClick={handleShowMore} className='w-full mt-5 py-4'>Show More</Button>
                        )
                    }
                </>
                }
                {users.length === 0 && (
                    <div className='h-[500px]  flex items-center justify-center'>
                        <p className='text-xl '>you have not post yet!</p>
                    </div>
                )}
            </div>
           {success &&<Alert>{success}</Alert>}
           {errorMessage && <Alert>{errorMessage}</Alert>}
            <CustomDialog isOpen={isDialogOpen} onClose={closeDialog}>
                <div className='w-[400px]'>
                    <h2 className="text-xl font-bold mb-4 text-black">Are you went to delete this User?</h2>
                    <div className='flex justify-end gap-3'>
                        <Button className='bg-red-500' onClick={closeDialog}>close</Button>
                        <Button onClick={handleUserDelete} className='bg-green-500'>Yes, sure</Button>
                    </div>
                </div>
            </CustomDialog>

        </div>
    )
}
