import React from 'react';
import './NavBarHome.css';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  return <h1>Home page</h1>
}

export const Notes = () => {
  return <h1>Notes page</h1>
}

export const User = () => {
  return <h1>User page</h1>
}

export const NavBarHome = () => {
  return (
    <div className='NavBar'>
      <ul>
        <li>
          <NavLink to='' className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='Notes' className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink to='User' className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
            User
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
