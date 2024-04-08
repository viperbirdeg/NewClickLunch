import React from 'react'
import { Route, Routes } from 'react-router';

import { Home, Notes, User } from '../pages/home/components/NavBarHome';
import UserLayout from '../pages/user/UserLayout';
import AdminLayout from '../pages/admin/AdminLayout';
import HomeLayout from "../pages/home/HomeLayout";

import logo from '../logo.svg';
import AuthLayout from '../pages/auth/AuthLayout';
import Register from '../pages/auth/components/Register';
import Login from '../pages/auth/components/Login';

const Router = () => {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch('/api').then((res) => { res.json() }).then((datos) => { setData(datos) });
    }, []);


    return (
        <Routes>
            <Route index path='/' element={
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        <h1>{!data ? "Loading..." : data.message}</h1>
                    </p>
                </header>
            } />
            <Route path='/Home' element={<HomeLayout />} >
                <Route index path='' element={<Home />} />
                <Route path='Notes' element={<Notes />} />
                <Route path='User' element={<User />} />
            </Route>
            <Route path='/User' element={<UserLayout />} >
            </Route>
            <Route path='/Admin' element={<AdminLayout />} >
            </Route>
            <Route path='/Auth' element={<AuthLayout />} >
                <Route index path='' element={<Login />} />
                <Route path='Register' element={<Register />} />
            </Route>
            <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
    )
}

export default Router;


