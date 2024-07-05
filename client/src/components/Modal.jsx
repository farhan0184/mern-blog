import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice'
import axios from 'axios'

export default function Modal({ openModal, handleOpenModal }) {
    const dispatch = useDispatch()
    const { user, error, loading } = useSelector((state) => state.user)
    const handleDeleteAccount = async () => {
        dispatch(deleteUserStart())
        try {
            const res = await axios.delete(`/api/user/delete/${user._id}`)
            if (res.statusText === 'OK') {
                dispatch(deleteUserSuccess())
                
                window.location.href = '/sign-in'
                handleOpenModal();
            }

        } catch (error) {
            dispatch(deleteUserFailure(error?.response?.data?.message))
        }
        // handleOpenModal();
    }
    return (
        <Dialog open={openModal} handler={handleOpenModal}>
            <DialogHeader>
                <Typography variant="h5" color={error?"red":"blue-gray"}>
                    {error? error:`Your Attention is Required!`}
                </Typography>
            </DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-16 w-16 text-red-500"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                        clipRule="evenodd"
                    />
                </svg>
                <Typography color="red" variant="h4">
                    You should Delete the account!
                </Typography>
                <Typography className="text-center font-normal">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui nisi molestias blanditiis, labore repellat eos iste laborum nesciunt quis excepturi?.
                </Typography>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="text" color="blue-gray" onClick={handleOpenModal}>
                    close
                </Button>
                <Button onClick={handleDeleteAccount} color="red" loading={loading}>
                    Yes, I&apos;m sure
                </Button>
            </DialogFooter>
        </Dialog>
    )
}
