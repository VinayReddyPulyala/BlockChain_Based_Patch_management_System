import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import AccountContext from '../AccountContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../useAuth';

function Developer() {
    let { ethereum } = window;
    let [Account, setAccount] = useState("");
    useAuth("Developer");
    const location = useLocation();
    useEffect(() => {
        async function setacc() {
            if (ethereum !== undefined) {
                let accounts = await ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]);
            }
        }
        setacc();
    }, [Account]);
    return (
        <div className="container my-5">
            <h3>Developer</h3>
            <nav className="navbar navbar-expand-sm bg-dark-subtle">
                <div className="container-fluid">
                    <ul className="navbar-nav w-100">
                        <li className={`nav-item col-sm text-center ${location.pathname == "/Developer"?"active":""}`}>
                            <Link className="nav-link col-12 text-dark" to="/Developer">Patch Requests</Link>
                        </li>
                        <li className={`nav-item col-sm text-center ${location.pathname == "/Developer/Rejects"?"active":""}`}>
                            <Link className="nav-link col-12 text-dark" to="/Developer/Rejects">Rejected Patches</Link>
                        </li>
                        <li className={`nav-item col-sm text-center ${location.pathname == "/Developer/transactions"?"active":""}`}>
                            <Link className="nav-link col-12 text-dark" to="/Developer/transactions">Your Transaction History</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="border border-secondary overflow-y-auto" style={{ height: "570px" }}>
                <AccountContext.Provider value={{ Account: Account }}>
                    <Outlet />
                </AccountContext.Provider>
            </div>
        </div>
    )
}

export default Developer;
