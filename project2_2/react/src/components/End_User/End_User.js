import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import useAuth from '../useAuth';

function End_User() {
    useAuth("End_User");
    return (
        <div className="container my-5">
            <h3>END_USER</h3>
            <nav className="navbar navbar-expand-sm bg-dark-subtle">
                <div className="container-fluid">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item col-sm text-center">
                            <Link className="nav-link col-12 text-dark" to="/End_User/Patches">Patches</Link>
                        </li>
                        <li className="nav-item col-sm text-center active">
                            <Link className="nav-link col-12 text-dark" to="/End_User/Report" aria-current="page">Report Bugs</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="border border-secondary">
                <Outlet />
            </div>
        </div>
    )
}

export default End_User
