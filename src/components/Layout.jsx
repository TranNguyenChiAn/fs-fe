import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./layouts/Header";

const Layout = () => {
    return (
        <div className="d-flex">
            <Header />
            <div className="flex-grow-1 p-3">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
