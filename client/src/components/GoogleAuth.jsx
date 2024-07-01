import { Button } from '@material-tailwind/react'
import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInFailure, signInSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function GoogleAuth() {
    const auth = getAuth(app)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleAuthClick = async () => {
        const provider = new GoogleAuthProvider()
        // always asked select account
        provider.setCustomParameters({ prompt: 'select_account' })

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            const res = await axios.post('/api/auth/google', {
                name: resultFromGoogle?.user.displayName,
                email: resultFromGoogle?.user.email,
                googlePhotoUrl: resultFromGoogle?.user.photoURL
            })

            if(res?.statusText === 'OK'){
                dispatch(signInSuccess(res?.data?.data))
                navigate('/')
            }
            else{
                dispatch(signInFailure(res?.data?.message))
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button
            onClick={handleAuthClick}
            variant="outlined"
            color="light-blue"
            className="flex items-center justify-center gap-3 w-full my-4 "
        >
            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-4 w-4" />
            Continue with Google
        </Button>
    )
}
