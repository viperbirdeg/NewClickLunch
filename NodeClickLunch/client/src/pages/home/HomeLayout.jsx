import React from 'react'
import { NavBarHome } from './components/NavBarHome'
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className='Home'>
        <NavBarHome />
        <Outlet />
    </div>
    
  )
}

export default HomeLayout