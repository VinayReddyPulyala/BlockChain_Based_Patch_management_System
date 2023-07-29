import React, { useEffect, useState } from 'react'
import axios from "axios";
import Web3 from 'web3';
import TransactionModal from './TransactionModal';
import { toast } from 'react-toastify';

const Transactions = () => {
    let [txs, settxs] = useState([]);
    let [txobj, settxobj] = useState([]);
    let [tx, settx] = useState({});
    let [txind, settxind] = useState(0);

    let web3 = new Web3(window.ethereum);

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

    useEffect(() => {
        async function func() {
            try {
                let { data } = await axios.get("http://localhost:8800/txhistory", {
                    withCredentials: true
                });
                if(!data){
                    generateerror("No Transactions available");
                    return ;
                }
                data.history.reverse();
                settxs(data.history);
                if (data) {
                    let arr = [];
                    for (let i = 0; i < data.history.length; i++) {
                        let obj = await web3.eth.getTransaction(data.history[i].txid);
                        console.log(obj);
                        arr.push(obj);
                    }
                    settxobj([...arr]);
                }
            } catch (err) {
                console.log(err);
                generateerror("Internal Server Error");
            }
        }
        func();
    }, []);
    if (txobj.length !== 0) {
        return (
            <>
                <TransactionModal txs={txs} tx={tx} txind={txind} />
                <div className="my-3 col-8 col-md-6 col-lg-5 col-xl-4 mx-auto">
                    {
                        txs.map((val, ind) => {
                            return (
                                <div className="card mb-3" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal1" key={ind} onClick={() => {
                                        settxind(ind);
                                        settx(txobj[ind]);
                                    }}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-2">
                                            <div className="fw-semibold">
                                                {val.description}
                                            </div>
                                            {
                                                (() => {
                                                    if (val.status === "Success") {
                                                        return (
                                                            <div style={{ color: "rgb(0, 255, 0)" }}>
                                                                {(txobj[ind].gas * txobj[ind].gasPrice / Math.pow(10, 18)).toFixed(5)}ETH-
                                                            </div>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <div className="fw-semibold" style={{ color: "rgba(255, 0, 0, 0.763)" }}>
                                                                Failed
                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }
                                        </div>
                                        <div className="d-sm-flex justify-content-between">
                                            <div style={{ fontSize: "12px" }}>
                                                On  {new Date(val.date).toLocaleString().split(",")[0]}
                                            </div>
                                            <div style={{ fontSize: "12px", cursor: "pointer" }}>
                                                <span className="text-primary">
                                                    See Transaction details
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                                                    </svg>
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
    else {
        return (
            <div>
                No Transactions Available....
            </div>
        )
    }
}

export default Transactions
