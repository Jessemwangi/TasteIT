import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Views/Footer';
import Header from '../Views/Header';

const Layout = () => {
    return (
        <>
            <Header />

            <Outlet />

            <Footer />
        </>
    );
};

export default Layout;