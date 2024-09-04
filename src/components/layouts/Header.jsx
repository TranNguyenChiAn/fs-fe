import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="d-flex flex-column vh-100 bg-light" style={{ width: '250px' }}>
            <h2 className="p-3">Sidebar</h2>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/books">Books</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/genres">Genre</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/users">User</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/login">Logout</Link>
                </li>
            </ul>
        </div>
    );
}
export default Header