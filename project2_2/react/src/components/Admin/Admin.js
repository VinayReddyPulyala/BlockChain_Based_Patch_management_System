import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom';
import AccountContext from '../AccountContext';
import useAuth from '../useAuth';
export default function Adminhome() {
    const location = useLocation();
    let { ethereum } = window;
    let [account, setAccount] = useState("");
    let [activeitem, setactive] = useState(0);
    useAuth("admin");
    console.log(location.pathname);
    useEffect(() => {
        async function setacc() {
            if (ethereum !== undefined) {
                let accounts = await ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]);
            }
        }
        setacc();
    }, [account]);
    return (
        <>
            <div className="container my-5">
                <h3>Admin</h3>
                <nav className="navbar navbar-expand-sm bg-dark-subtle">
                    <div className="container-fluid">
                        <ul className="navbar-nav w-100">
                            <li className={`nav-item col-sm text-center ${location.pathname == "/admin" ? "active" : ""}`}>
                                <Link className="nav-link col-12 text-dark" to="/admin">
                                    Patch
                                    Details</Link>
                            </li>
                            <li className={`nav-item col-sm text-center ${location.pathname == "/admin/deploy" ? "active" : ""}`}>
                                <Link className="nav-link col-12 text-dark" to="/admin/deploy">Patch Deployment</Link>
                            </li>
                            <li className={`nav-item col-sm text-center ${location.pathname == "/admin/DownloadHistory" ? "active" : ""}`}>
                                <Link className="nav-link col-12 text-dark" to="/admin/DownloadHistory">Download History</Link>
                            </li>
                            <li className={`nav-item col-sm text-center ${location.pathname == "/admin/req" ? "active" : ""}`}>
                                <Link className="nav-link col-12 text-dark" to="/admin/req">Requests</Link>
                            </li>
                            <li className={`nav-item col-sm text-center ${location.pathname == "/admin/transactions" ? "active" : ""}`}>
                                <Link className="nav-link col-12 text-dark" to="/admin/transactions">Your Transaction History</Link>
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
        </>
    )
}

