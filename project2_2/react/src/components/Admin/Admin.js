import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import AccountContext from '../AccountContext';
import useAuth from '../useAuth';
export default function Adminhome() {
    let { ethereum } = window;
    let [account, setAccount] = useState("");
    useAuth("admin");
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
            <div id="tx">

            </div>
            <div className="container my-5">
                <nav className="navbar navbar-expand-sm bg-dark-subtle">
                    <div className="container-fluid">
                        <ul className="navbar-nav w-100">
                            <li className="nav-item col-sm text-center">
                                <Link className="nav-link col-12 text-dark" to="/admin">
                                    Patch
                                    Details</Link>
                            </li>
                            <li className="nav-item col-sm text-center">
                                <Link className="nav-link col-12 text-dark" to="/admin/deploy">Patch Deployment</Link>
                            </li>
                            <li className="nav-item col-sm text-center">
                                <Link className="nav-link col-12 text-dark" to="/admin/DownloadHistory">Download History</Link>
                            </li>
                            <li className="nav-item col-sm text-center">
                                <Link className="nav-link col-12 text-dark" to="/admin/req">Request Patch </Link>
                            </li>
                            <li className="nav-item col-sm text-center">
                                <Link className="nav-link col-12 text-dark" to="/admin/transactions">Your Transaction History</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="border border-secondary overflow-y-auto" style={{height:"550px"}}>
                    <AccountContext.Provider value={{ Account: account }}>
                        <Outlet />
                    </AccountContext.Provider>
                </div>
            </div>
        </>
    )
}

