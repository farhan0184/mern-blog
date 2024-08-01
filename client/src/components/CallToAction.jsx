import { Button } from '@material-tailwind/react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex gap-5 p-7 border-light-green-800 border-2 rounded-tl-[30px] rounded-br-[30px] my-5'>
        <div className='space-y-3 flex-1 flex flex-col  justify-center'>
            <h2 className='text-2xl'>Want to learn mone about JavaScript?</h2>
            <p className='text-gray-500'>Checkout these resources with 100 JavaScript Projects</p>
            <Button className='btn w-full'>View Projects</Button>
        </div>
        <div className='flex-1'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtME2Ho74uhChIuase5oqeJujVV-wmBEAWAg&s' className='w-full object-cover'/>
        </div>
    </div>
  )
}
