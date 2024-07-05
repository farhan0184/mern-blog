import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CustomInput from './CustomInput'
import { useForm } from 'react-hook-form'
import { profileSchema } from '../utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomBtn from './CustomBtn'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { Alert } from '@material-tailwind/react'
// progress bar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getChangedProperties } from '../utils/utlis'
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

export default function DashboardProfile() {
  // redux section
  const { user, error, loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  console.log(error)
  // default values
  const userDefaultData = {
    profilePicture: user.profilePicture,
    username: user.username,
    email: user.email,
    password: ''
  }

  // image section
  const [imageFile, setImageFile] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const imagePickerRef = useRef(null)

  // firebase image upload
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  
  // user update section
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);


  // form : react hook form
  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    defaultValues: userDefaultData,
    resolver: zodResolver(profileSchema),

  })

  // image section
  const handleImageFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImageURL(URL.createObjectURL(file))
    }
  }
  //  console.log(imageFile)
  // if image Upload then firebase function work
  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])


  // firebase  image upload
  const uploadImage = async () => {

    /* rules_version = '2';

      // Craft rules based on data in your Firestore database
      // allow write: if firestore.get(
      //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
      service firebase.storage {
        match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read; 
          allow write: if
          request.resource.size < 2 * 1024 * 1024 &&
          request.resource.contentType.matches('image/.*')
          }
        }
      } */

    setImageFileUploading(true);
    setImageFileUploadError(null)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name // file name unique 
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0))
        setImageFileUploadError(null)
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be 2MB)')
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageURL(null)
        setImageFileUploading(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          setImageURL(downloadURL)
          setImageFileUploading(false);
        });
      }

    )
  }

  // form submit function
  const onSubmit = async (value) => {
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    value.profilePicture = imageURL || user.profilePicture;
    const changes = getChangedProperties(userDefaultData, value)
    if (Object.keys(changes).length === 0) {
      setUpdateUserError('nothing to update')
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('please wait while image is uploading')
      return;
    }

    try {
      dispatch(updateStart())
      const res = await axios.put(`/api/user/update/${user._id}`, changes)
      if (res.statusText === 'OK') {
        dispatch(updateSuccess(res?.data?.data))
        window.location.reload(); // for reload page
        
      } else {
        dispatch(updateFailure(res?.data?.message))
      }
    } catch (error) {
      dispatch(updateFailure(error?.response?.data?.message))
    }

  }
  // console.log(imageFile, imageURL)
  return (
    <div className='max-w-lg mx-auto p-3 mb-10 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* image input */}
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mx-auto ' onClick={() => imagePickerRef?.current?.click()}>
          <input type='file' name='' accept='image/*' className='hidden' onChange={handleImageFile} ref={imagePickerRef} />

          {imageFileUploadProgress &&
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${(imageFileUploadProgress / 100) * 100}%`}
              styles={{
                root: {
                  width: '100%',
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`
                }
              }}
            />
          }
          <img
            src={imageURL || user?.profilePicture}
            alt="userImg"
            className={`rounded-full w-full h-full object-cover border-8 border-gray-500  ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
          />
        </div>
        {/* error image section */}
        {imageFileUploadError && <Alert color="red">{imageFileUploadError}</Alert>}
        {/* simple input */}
        <CustomInput type={'text'} register={register} name={'username'} placeholder={'text0001'} error={errors.username} label={'Username'} />
        <CustomInput type={'email'} register={register} name={'email'} placeholder={'compan@gmail.com'} error={errors.email} label={'Your Email'} disabled={true} />
        <CustomInput type={'password'} register={register} name={'password'} placeholder={'password'} error={errors.password} label={'Password'} />
        <CustomBtn title={'Sign In'} loading={loading} />

      </form>

      <div className='text-red-500 flex justify-between py-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>

      {error && <Alert color="red">{error}</Alert>}
      {updateUserError && <Alert color="red">{updateUserError}</Alert>}
      {
        updateUserSuccess && <Alert color="green">{updateUserSuccess}</Alert>
      }
    </div>
  )
}
