import React from 'react'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='Auth'>        
      <Outlet />
    </div>

  )
}

export default AuthLayout