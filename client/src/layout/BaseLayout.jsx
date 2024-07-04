import React from 'react'
import { Outlet } from 'react-router-dom'

export default function BaseLayout() {
  return (
    <div className='pt-20'>
        <Outlet />
    </div>
  )
}
