import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import context from '../../context';
import AccountContext from '../AccountContext';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import Web3 from 'web3';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Admindeploy() {
    const { contract } = useContext(context);
    let [Patches, setPatches] = useState([]);
    let { Account } = useContext(AccountContext);
    let Navigate = useNavigate();
    useEffect(() => {

        async function fun() {
            const web3 = new Web3(window.ethereum);
            let res = await web3.eth.getTransaction("0x54c7d483a43da0936e00659b35b3f562ae7303b40dabdd88aee11ef063feeb85");
            console.log(res);
            if (contract.methods !== undefined) {
                console.log(contract);
                let pchhashes = await contract.methods.getpatchhash().call();
                let patches = await Promise.all(pchhashes.map(async (hash) => {
                    return await contract.methods.getpatch(hash).call();
                }));
                setPatches((patches.filter((val) => {
                    return val.verifystatus === "Success";
                })).reverse()
                );
            }
            $(function () {
                $('#tableId').DataTable();
            })
        }
        fun();
    }, [contract]);
    console.log(Account);
    async function handledeploychange(name, version) {
        try {
            let res = await contract.methods.deploy(name, version).send({ from: Account });
            document.getElementById("tx").innerHTML = `Successfully Deployed, Your Transaction Hash : ${res.transactionHash}`;
            try {
                await axios.post("http://localhost:8800/txhistory/uploadtx", {
                    role: "admin",
                    tx: res.transactionHash,
                    desc: "Deploy a Patch",
                    status: "Success"
                });
                setTimeout(() => {
                    Navigate("/admin");
                }, 5000);
            } catch (err) {
                alert("Transaction Successfull Failed to Upload to database!");
            }
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (err) {
            console.log(err);
            console.log(JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash);
            if (err.message.includes("MetaMask Tx Signature: User denied transaction signature")) {
                alert("User denied transaction signature");
            }
            else if (err.message.includes("[ethjs-query] while formatting outputs from RPC")) {
                try {
                    alert("Only Admin has authority to do this..");
                    await axios.post("http://localhost:8800/txhistory/uploadtx", {
                        role: "Developer",
                        tx: JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash,
                        desc: "Deploy a Patch",
                        status: "Failed"
                    });
                    setTimeout(() => {
                        Navigate("/Developer");
                    }, 5000);
                } catch (err) {
                    alert("Transaction Failed to Upload to database!");
                }
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
        }
    }
    if (Patches.length !== 0) {
        return (
            <div className="container my-5 table-responsive col-11 mx-auto" id="patchdpl">
                <table className="table table-striped table-borderless" id="tableId">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Patch_Name</th>
                            <th>Software</th>
                            <th>Features</th>
                            <th>timestamp</th>
                            <th>Verification Status</th>
                            <th>Deploy Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Patches.map((val, ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{ind + 1}</td>
                                    <td>{val.patchname}</td>
                                    <td>{val.software}</td>
                                    <td>{val.patchfeatures.split("</br>")[0]} <br /> {val.patchfeatures.split("</br>")[1]} </td>
                                    <td>{new Date(val.timestamp * 1000).toLocaleString()}</td>
                                    <td>{val.verifystatus}</td>
                                    <td>
                                        {(() => {
                                            if (val.deploystatus === "Deployed") {
                                                return "Deployed";
                                            } else {
                                                return <button className="btn btn-primary" onClick={() => {
                                                    handledeploychange(val.patchname, val.version);
                                                }}>Deploy</button>;
                                            }
                                        })()}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <div> No data Available...</div>
        )
    }
}

export default Admindeploy
