import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <div>
            <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="d-flex flex-column">
                                <div className="m-3">
                                    <label htmlFor="Username" className="form-label">Username</label>
                                    <input type="username" className="form-control" id="Username"
                                        placeholder="Enter Username" />
                                </div>
                                <div className="m-3">
                                    <label htmlFor="Password" className="form-label">Password</label>
                                    <input type="Password" className="form-control" id="Password"
                                        placeholder="Enter Password" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success">Login</button>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-md bg-success">
                <div className="container-fluid">
                    <button className="navbar-toggler text-bg-light" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand text-light col-3" href="#">
                        <img src="https://kmit.in/images/kmit-bar.png"
                            width="100" height="40" />
                    </a>
                    <div className="ms-2 collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav">
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-light" to="/Home">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-light" to="/About_Us">About Us</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-light" to="/Contact_Us">Contact Us</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-light" to="/admin">DashBoard</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <button type="button" className="btn text-light nav-link" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                    Login
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
