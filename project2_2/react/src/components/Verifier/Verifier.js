import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import AccountContext from '../AccountContext';
import useAuth from '../useAuth';
function Verifier() {
    let { ethereum } = window;
    let [Account, setAccount] = useState("");
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
            <p id="tx" className="fs-5"></p>
            <h3>VERIFIER</h3>
            <nav className="navbar navbar-expand-sm bg-dark-subtle">
                <div className="container-fluid">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item col-sm text-center active">
                            <Link className="nav-link col-12 text-dark" to="/verifier">Unchecked</Link>
                        </li>
                        <li className="nav-item col-sm text-center">
                            <Link className="nav-link col-12 text-dark" to="/verifier/checked">Checked</Link>
                        </li>
                        <li className="nav-item col-sm text-center">
                            <Link className="nav-link col-12 text-dark" to="/verifier/transactions">Your Transaction History</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container border border-secondary p-3 overflow-y-auto" style={{height:"550px"}}>
                <AccountContext.Provider value={{ Account: Account }}>
                    <Outlet />
                </AccountContext.Provider>
            </div>
        </div>
    )
}

export default Verifier;
