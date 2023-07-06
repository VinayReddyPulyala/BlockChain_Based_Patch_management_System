import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';


function Navbar() {
    let navigate = useNavigate();
    let [role, setrole] = useState("End_User");
    let mod = useRef(null);
    let [user, setuser] = useState({
        username: '',
        password: ''
    });
    let cookie = new Cookies();
    let [logup, setlogup] = useState("Login");

    let handleusernamechange = (event) => {
        setuser({ ...user, username: event.target.value });
    }
    let handlepaswdchange = (event) => {
        setuser({ ...user, password: event.target.value });
    }

    let generateerror = (err) => {
        toast.error(err, {
            position: "bottom-right",
            autoClose: 2000,
            closeOnClick: true,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    let generatesuccess = (mes) => {
        toast.success(mes, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    let handlelogout = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8800/logout", {}, {
            withCredentials: true
        })
        setuser({ username: "", password: "" });
        generatesuccess("Successfully Logged Out");
        navigate("/");
    }

    let handlesubmit = async (event) => {
        event.preventDefault();
        if (logup == "Login") {
            try {
                let { data } = await axios.post("http://localhost:8800/login", user, {
                    withCredentials: true
                });
                if (data.error) {
                    generateerror(data.error);
                }
                else {
                    setrole(data.role);
                    navigate(`/${data.role}`);
                    generatesuccess("Successfully Logged In");
                    document.getElementById("close").click();
                }
            } catch (err) {
                generateerror("Interal Server Error! Please Visit again after some time.");
                document.getElementById("close").click();
            }
        }
        else {
            try {
                let { data } = await axios.post("http://localhost:8800/Register", user, {
                    withCredentials: true
                });
                if (data.error) {
                    if (data.error.username) {
                        generateerror(data.error.username);
                    }
                    else {
                        generateerror(data.error.password);
                    }
                } else {
                    generatesuccess("Successfully Registered");
                    navigate(`/${role}`)
                    document.getElementById("close").click();
                }
            } catch (err) {
                generateerror("Interal Server Error! Please visit again after some time.");
                console.error(err);
                document.getElementById("close").click();
            }
        }
    }
    useEffect(() => {
        async function func() {
            try {
                let { data } = await axios.get("http://localhost:8800/initlog",{
                    withCredentials:true
                }); 
                if (!data.error) {
                    setrole(data.role);
                } else {
                    console.log(data.error);
                }
            } catch (err) {
                alert('Internal server error!');
            }
        }
        func();
    })
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{logup}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className='d-flex flex-column justify-content-between'>
                                    <div className="mb-3 row">
                                        <label htmlFor="staticusname" className="col-sm-2 col-form-label">Username</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" value={user.username} id="staticusname" onChange={handleusernamechange} required />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-7">
                                            <input type="password" className="form-control" value={user.password} id="inputPassword" onChange={handlepaswdchange} required />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center mt-3'>
                                        <div>
                                            <div className='text-center mb-2'>
                                                <button type="button" className="btn btn-primary" onClick={handlesubmit}>
                                                    {logup}
                                                </button>
                                            </div>
                                            {
                                                (() => {
                                                    if (logup == "Login") {
                                                        return (
                                                            <span>New User ? <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                                                                setlogup("Register")
                                                            }}>Register</span></span>
                                                        );
                                                    }
                                                    else {

                                                        return (
                                                            <span>Already have an account? <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                                                                setlogup("Login")
                                                            }}> Login</span></span>
                                                        )
                                                    }
                                                })()
                                            }
                                        </div>
                                    </div>
                                </div>
                            </form>
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
                    <div className="ms-2 collapse navbar-collapse d-md-flex justify-content-md-between" id="navbarTogglerDemo03">
                        <ul className="navbar-nav">
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-dark" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-dark" to="/About_Us">About Us</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-dark" to="/Contact_Us">Contact Us</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link text-dark" to={`/${role}`}>DashBoard</Link>
                            </li>
                        </ul>
                        {
                            (() => {
                                if (!cookie.get('jwt')) {
                                    return (
                                        <span className="nav-item mx-2">
                                            <button type="button" className="btn text-dark nav-link" data-bs-toggle="modal" ref={mod}
                                                data-bs-target="#exampleModal">
                                                Login
                                            </button>
                                        </span>
                                    )
                                }
                                else {

                                    return (
                                        <span className="nav-item mx-2">
                                            <button type="button" className="btn text-dark nav-link" onClick={handlelogout}>
                                                Log out
                                            </button>
                                        </span>
                                    )
                                }
                            })()
                        }

                    </div>
                </div>
            </nav>
            <ToastContainer />
        </div>
    )
}

export default Navbar;
