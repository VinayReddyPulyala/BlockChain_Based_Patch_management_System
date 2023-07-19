import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import AccountContext from '../AccountContext';
import useAuth from '../useAuth';
function Verifier() {
    let { ethereum } = window;
    let [Account, setAccount] = useState("");
    const location = useLocation();
    useAuth("verifier");
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
            <h3>Verifier</h3>
            <nav className="navbar navbar-expand-sm bg-dark-subtle">
                <div className="container-fluid">
                    <ul className="navbar-nav w-100">
                        <li className={`nav-item col-sm text-center ${location.pathname == "/verifier" ? "active" : ""}`}>
                            <Link className="nav-link col-12 text-dark" to="/verifier">Unverified</Link>
                        </li>
                        <li className={`nav-item col-sm text-center ${location.pathname == "/verifier/checked" ? "active" : ""}`}>
                            <Link className="nav-link col-12 text-dark" to="/verifier/checked">Verified</Link>
                        </li>
                        <li className={`nav-item col-sm text-center ${location.pathname == "/verifier/transactions" ? "active" : ""}`}>
                            <Link className="nav-link col-12 text-dark" to="/verifier/transactions">Your Transaction History</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container border border-secondary p-3 overflow-y-auto" style={{ height: "530px" }}>
                <AccountContext.Provider value={{ Account: Account }}>
                    <Outlet />
                </AccountContext.Provider>
            </div>
        </div>
    )
}

export default Verifier;
