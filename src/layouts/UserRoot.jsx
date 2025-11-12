import React from 'react'
import UserHeader from '../components/UserHeader'
import { Outlet } from 'react-router-dom'

const UserRoot = () => {
  return (
    <>
        <UserHeader />
        <Outlet />
    </>
  )
}

export default UserRoot