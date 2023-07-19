import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import context from '../../context';
import AccountContext from '../AccountContext';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Bugfeaturedesc from '../Bugfeaturedesc';
import { toast } from 'react-toastify';
function Admindeploy() {
    const { contract } = useContext(context);
    let [Patches, setPatches] = useState([]);
    let { Account } = useContext(AccountContext);
    let [bugs, setBugs] = useState([]);
    let [features, setFeatures] = useState([]);
    let [software, setsoftware] = useState("");
    let Navigate = useNavigate();
    useEffect(() => {
        async function fun() {
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

    let generateerror = (err) => {
        toast.error(err, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    let generatesuccess = (mes) => {
        toast.success(mes, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    console.log(Account);
    async function handledeploychange(name, version, reqno) {
        try {
            let res = await contract.methods.deploy(name, version, reqno).send({ from: Account });
            try {
                generatesuccess(`Transaction Successfull Your Transaction hash : ${res.transactionHash}`);
                await axios.post("http://localhost:8800/txhistory/uploadtx", {
                    role: "admin",
                    tx: res.transactionHash,
                    desc: "Deploy a Patch",
                    status: "Success"
                });
            } catch (err) {
                generateerror("Error while storing the transaction hash");
            }
            setTimeout(() => {
                Navigate("/admin");
            }, 3000);

        } catch (err) {
            console.log(err);
            console.log(JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash);
            if (err.message.includes("MetaMask Tx Signature: User denied transaction signature")) {
                generateerror("User denied transaction signature");
            }
            else if (err.message.includes("[ethjs-query] while formatting outputs from RPC")) {
                try {
                    generateerror("Only Admin has authority to do this..");
                    await axios.post("http://localhost:8800/txhistory/uploadtx", {
                        role: "admin",
                        tx: JSON.parse(err.message.slice(49, err.message.length - 1)).value.data.data.hash,
                        desc: "Deploy a Patch",
                        status: "Failed"
                    });
                } catch (err) {
                    generateerror("Error while storing the transaction hash");
                }
            }
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        }
    }
    if (Patches.length !== 0) {
        return (
            <>
                <Bugfeaturedesc bugs={bugs} features={features} software={software} />
                <div className="container my-5 table-responsive col-11 mx-auto" id="patchdpl">
                    <table className="table table-striped table-borderless" id="tableId">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Patch_Name</th>
                                <th>Software</th>
                                <th>bugFixes</th>
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
                                        <td>{val.patchname}
                                            <span title="click to get the description" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal1" onClick={async () => {
                                                    setBugs(val.bugfixes.split(", "));
                                                    setFeatures(val.patchfeatures.split(", "));
                                                    setsoftware(val.software);
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16" >
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                </svg>
                                            </span>
                                        </td>
                                        <td>{val.software}</td>
                                        <td>{val.bugfixes}</td>
                                        <td>{val.patchfeatures.split("</br>")[0]} <br /> {val.patchfeatures.split("</br>")[1]} </td>
                                        <td>{new Date(val.timestamp * 1000).toLocaleString()}</td>
                                        <td>{val.verifystatus}</td>
                                        <td>
                                            {(() => {
                                                if (val.deploystatus === "Deployed") {
                                                    return "Deployed";
                                                } else {
                                                    return <button className="btn btn-primary" onClick={() => {
                                                        handledeploychange(val.patchname, val.version, val.reqno);
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
            </>
        )
    }
    else {
        return (
            <div>  No data Available...</div>
        )
    }
}

export default Admindeploy
