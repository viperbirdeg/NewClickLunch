import React from 'react';
import './NavBarHome.css';
import { Routes, Route, Link } from 'react-router-dom';

const Home = () => {
  return <h1>Home page</h1>
}


const Notes = () => {
  return <h1> Notes page</h1>
}

const User = () => {
  return <h1> Users page</h1>
}

const NavBarHome = () => {

  return (
      <div className='NavBar'>
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/Notes'>Notes</Link></li>
              <li><Link to='/User'>User</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Notes' element={<Notes />} />
          <Route path='/User' element={<User />}/>
        </Routes>
      </div>
  );
}

export default NavBarHome;