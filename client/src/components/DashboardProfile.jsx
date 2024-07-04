import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CustomInput from './CustomInput'
import { useForm } from 'react-hook-form'
import { profileSchema } from '../utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomBtn from './CustomBtn'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { Alert } from '@material-tailwind/react'
// progress bar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashboardProfile() {
  const [loading, setLoading] = useState(false)
  // redux section
  const { user } = useSelector((state) => state.user)

  // image section
  const [imageFile, setImageFile] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const imagePickerRef = useRef(null)

  // firebase image upload
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  // console.log(imageFileUploadProgress, imageFileUploadError)

  // form : react hook form
  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    defaultValues: {
      profileImg: user.profilePicture,
      username: user.username,
      email: user.email,
      password: ''
    },
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
   console.log(imageFile)
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL)
        });
      }

    )
  }

  // form submit function
  const onSubmit = async (value) => {
    console.log(value)
  }
  // console.log(imageFile, imageURL)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* image input */}
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mx-auto ' onClick={() => imagePickerRef?.current?.click()}>
          <input type='file' accept='image/*' className='hidden' onChange={handleImageFile} ref={imagePickerRef} />

          {imageFileUploadProgress &&
            <CircularProgressbar 
              value={imageFileUploadProgress || 0} 
              text={`${(imageFileUploadProgress /100) * 100}%`} 
              styles={{
                root:{
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
        <CustomInput type={'email'} register={register} name={'email'} placeholder={'compan@gmail.com'} error={errors.email} label={'Your Email'} />
        <CustomInput type={'password'} register={register} name={'password'} placeholder={'password'} error={errors.password} label={'Password'} />
        <CustomBtn title={'Sign In'} loading={loading} />

      </form>

      <div className='text-red-500 flex justify-between pt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
