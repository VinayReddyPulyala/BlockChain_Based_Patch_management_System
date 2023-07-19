import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../useAuth';

function End_User() {
    useAuth("End_User");
    const location = useLocation();
    return (
        <div className="container my-5">
            <h3>END_USER</h3>
            <nav className="navbar navbar-expand-sm bg-dark-subtle">
                <div className="container-fluid">
                    <ul className="navbar-nav w-100">
                        <li className={`nav-item col-sm text-center ${location.pathname=="/End_User"?"active":""}`}>
                            <Link className="nav-link col-12 text-dark" to="/End_User">Patches</Link>
                        </li>
                        <li className={`nav-item col-sm text-center ${location.pathname=="/End_User/Report"?"active":""}`}>
                            <Link className="nav-link col-12 text-dark" to="/End_User/Report">Report Bugs</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="border border-secondary overflow-y-auto" style={{height:"550px"}}>
                <Outlet />
            </div>
        </div>
    )
}

export default End_User
