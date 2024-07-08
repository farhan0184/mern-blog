import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function IsAdminPrivateRoute() {
    const {user} = useSelector(state => state.user)
  return user && user.isAdmin ? <Outlet /> : <Navigate to='/sign-in' />
}
