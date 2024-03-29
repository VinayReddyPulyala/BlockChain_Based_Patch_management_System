import React, { useEffect, useState } from 'react'
import AccountContext from '../AccountContext';
import { Outlet, Link, useLocation } from 'react-router-dom';
import useAuth from '../useAuth';

function Labeller() {
    let [account, setAccount] = useState("");
    let { ethereum } = window;
    const location = useLocation();
    useAuth("labeller");
    useEffect(() => {
        async function retrieve() {
            if (ethereum !== undefined) {
                let accounts = await ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]);
            }
        }
        retrieve();
    }, [account]);
    return (
        <div className="container my-5">
            <h3>Labeller</h3>
            <nav className="navbar navbar-expand-sm bg-dark-subtle">
                <div className="container-fluid">
                    <ul className="navbar-nav w-100">
                        <li className={`nav-item col-sm text-center ${location.pathname == "/labeller" ? "active" : ""}`}>
                            <Link className="nav-link col-12 text-dark" to="/labeller">
                                Bugs And Features</Link>
                        </li>
                        <li className={`nav-item col-sm text-center ${location.pathname == "/labeller/addreport" ? "active" : ""}`}
                        >
                            <Link className="nav-link col-12 text-dark" to="/labeller/addreport">Add Report</Link>
                        </li>
                        <li className={`nav-item col-sm text-center ${location.pathname == "/labeller/Userreports" ? "active" : ""}`}>
                            <Link className="nav-link col-12 text-dark" to="/labeller/Userreports">UserReports</Link>
                        </li>
                        <li className={`nav-item col-sm text-center ${location.pathname == "/labeller/transactions" ? "active" : ""}`}>
                            <Link className="nav-link col-12 text-dark" to="/labeller/transactions">Your Transaction History</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="border border-secondary overflow-y-auto" style={{ height: "550px" }}>
                <AccountContext.Provider value={{ Account: account }}>
                    <Outlet />
                </AccountContext.Provider>
            </div>
        </div>
    )
}

export default Labeller
